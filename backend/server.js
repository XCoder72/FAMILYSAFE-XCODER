require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 🛡️ MODELS & SIMULATION IMPORTS
const User = require('./models/User');
const { startGeneralSimulation, runScenario } = require('./simulation/index');

const app = express();

// 🛠️ DYNAMIC CORS SETUP
const allowedOrigins = [
    "http://localhost:5173", 
    "https://familysafe-frontend.vercel.app" // 👈 Fixed: No trailing slash
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS Policy: Access Denied'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); 

// 🚀 HEALTH CHECK
app.get('/', (req, res) => {
    res.status(200).send('🚀 FamilySafe Premium API is Live and Connected!');
});

const server = http.createServer(app);

// 📡 SOCKET.IO
const io = new Server(server, {
    cors: { 
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// 🛡️ CLOUDINARY SETUP
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FamilySafe_Reports',
    allowed_formats: ['jpg', 'png', 'pdf'],
  },
});
const upload = multer({ storage: storage });

// ---------------------------------------------------------
// 📑 ROUTES (Restored from your previous logic)
// ---------------------------------------------------------

// 1. Login / Register
app.post('/api/login', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: "Phone is required" });
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone, role: 'Member', status: 'Online' });
        }
        res.json({ success: true, otp: generatedOtp, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Profile Update (Admin/Member Setup)
app.put('/api/update-profile', async (req, res) => {
    try {
        const { loginPhone, name, email, emergencyPhone, gender, address, role } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { phone: loginPhone },
            { $set: { name, email, emergencyPhone, gender, address, role, isSetupComplete: true } },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Database Error" });
    }
});

// 3. Create Network
app.post('/api/create-network', async (req, res) => {
    try {
        const { phone } = req.body;
        const newFamilyCode = "SAFE-" + Math.floor(1000 + Math.random() * 9000); 
        const updatedUser = await User.findOneAndUpdate(
            { phone },
            { $set: { familyCode: newFamilyCode, role: 'Admin' } },
            { new: true }
        );
        res.status(200).json({ success: true, familyCode: newFamilyCode, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// 4. Join Network
app.post('/api/join-network', async (req, res) => {
    try {
        const { phone, familyCode } = req.body;
        const adminExists = await User.findOne({ familyCode, role: 'Admin' });
        if (!adminExists) return res.status(404).json({ success: false, message: "Invalid Invite Code!" });
        const updatedUser = await User.findOneAndUpdate(
            { phone }, 
            { $set: { role: 'Member', familyCode, isSetupComplete: false } }, 
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to join" });
    }
});

// 5. Fetch Family Members
app.get('/api/family-members/:familyCode', async (req, res) => {
    try {
        const { familyCode } = req.params;
        const members = await User.find({ familyCode });
        res.json({ success: true, members });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching family" });
    }
});

// 6. Simulate Emergency
app.put('/api/simulate/:phone', async (req, res) => {
    try {
        const { type } = req.body;
        const { phone } = req.params;
        const updatedUser = await runScenario(phone, type);
        if (updatedUser) {
            if (type === 'DISCONNECT') {
                io.emit('hardware_status', { phone, status: 'Offline' });
            }
            res.json({ success: true, user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 7. Upload Report
app.post('/api/upload-report/:phone', upload.single('report'), async (req, res) => {
    try {
        const { phone } = req.params;
        const newReport = {
            reportName: req.body.reportName || "New Report",
            doctorName: req.body.doctorName || "General Physician",
            category: req.body.category || "Consultation",
            fileUrl: req.file.path, 
            date: new Date()
        };
        const user = await User.findOneAndUpdate(
            { phone: phone },
            { $push: { medicalReports: newReport } },
            { new: true } 
        );
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Upload Error" });
    }
});

// ---------------------------------------------------------
// 📡 SERVER STARTUP
// ---------------------------------------------------------
const startApp = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI; 
        if (!MONGO_URI) {
            console.error("❌ ERROR: MONGO_URI missing!");
            process.exit(1);
        }

        await mongoose.connect(MONGO_URI);
        console.log('🟢 MongoDB Cloud Connected Successfully!');

        startGeneralSimulation(); 

        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`🚀 System Engine Live on Port: ${PORT}`);
        });

        io.on('connection', (socket) => {
            socket.on('send_message', (data) => {
                socket.broadcast.emit('receive_message', data); 
            });
        });

    } catch (error) {
        console.error('🔴 Startup Error:', error);
        process.exit(1);
    }
};

startApp();