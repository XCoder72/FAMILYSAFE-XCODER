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
const { startGeneralSimulation, runScenario } = require('./simulation/index'); // ✅ Using the new modular folder

const app = express();

// ---------------------------------------------------------
// 🛠️ MIDDLEWARE & CORS
// ---------------------------------------------------------
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); 

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// ---------------------------------------------------------
// 🛡️ CLOUDINARY & MULTER SETUP
// ---------------------------------------------------------
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
// 🟢 DATABASE CONNECTION & SIMULATION START
// ---------------------------------------------------------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/familysafe';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🟢 MongoDB Connected Successfully!');
        // 🚀 Start the background simulation heartbeat immediately on DB connect
        startGeneralSimulation(); 
    })
    .catch(err => console.log('🔴 MongoDB Connection Error:', err));

// ---------------------------------------------------------
// 📑 ROUTES
// ---------------------------------------------------------

// 1. Login / Register
app.post('/api/login', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: "Phone is required" });

        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        let user = await User.findOne({ phone });
        
        if (!user) {
            console.log(`🆕 Registering new user: ${phone}`);
            user = await User.create({ phone, role: 'Member', status: 'Online' });
        }

        console.log(`✨ SUCCESS: OTP for ${phone} is [ ${generatedOtp} ]`);
        res.json({ success: true, otp: generatedOtp, user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// 2. Create Network
app.post('/api/create-network', async (req, res) => {
  try {
    const { phone } = req.body;
    const newFamilyCode = "SAFE-" + Math.floor(1000 + Math.random() * 9000); 
    const updatedUser = await User.findOneAndUpdate(
      { phone },
      { $set: { familyCode: newFamilyCode, role: 'Admin' } },
      { returnDocument: 'after' }
    );
    res.status(200).json({ success: true, familyCode: newFamilyCode, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 3. Join Network
app.post('/api/join-network', async (req, res) => {
    try {
        const { phone, familyCode } = req.body;
        const adminExists = await User.findOne({ familyCode, role: 'Admin' });
        if (!adminExists) return res.status(404).json({ success: false, message: "Invalid Invite Code!" });

        const updatedUser = await User.findOneAndUpdate(
            { phone }, 
            { $set: { role: 'Member', familyCode, isSetupComplete: false } }, 
            { returnDocument: 'after' }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to join" });
    }
});

// 4. Upload Medical Report
app.post('/api/upload-report/:phone', upload.single('report'), async (req, res) => {
  try {
    const { phone } = req.params;
    const { reportName, doctorName, category } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const newReport = {
      reportName: reportName || "New Report",
      doctorName: doctorName || "General Physician",
      category: category || "Consultation",
      fileUrl: req.file.path, 
      date: new Date()
    };

    const user = await User.findOneAndUpdate(
      { phone: phone },
      { $push: { medicalReports: newReport } },
      { returnDocument: 'after', runValidators: true } 
    );

    console.log(`✅ [MEDICAL VAULT] Report added for ${phone}`);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

// 5. Emergency Simulation Trigger (The Panel Route)
app.put('/api/simulate/:phone', async (req, res) => {
    try {
        const { type } = req.body;
        const { phone } = req.params;
        const updatedUser = await runScenario(phone, type);
        
        if (updatedUser) {
            res.json({ success: true, user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 6. Fetch Family Members
app.get('/api/family-members/:familyCode', async (req, res) => {
    try {
        const { familyCode } = req.params;
        const members = await User.find({ familyCode });
        res.json({ success: true, members });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching family" });
    }
});

// ---------------------------------------------------------
// 📡 WEBSOCKETS & SERVER START
// ---------------------------------------------------------
io.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data); 
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Premium Backend Engine running on http://localhost:${PORT}`);
});