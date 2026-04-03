require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const User = require('./models/User');
const { startGeneralSimulation } = require('./simulator');

const app = express();

// ---------------------------------------------------------
// 🛠️ MIDDLEWARE & CORS (Fixed for File Uploads)
// ---------------------------------------------------------
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"] // Essential for Multer
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
// 🟢 DATABASE CONNECTION
// ---------------------------------------------------------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/familysafe';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('🟢 MongoDB Connected Successfully!');
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

        // ✨ Generate OTP first
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        
        // ✨ Find user OR Create them if they don't exist (Upsert)
        let user = await User.findOne({ phone });
        
        if (!user) {
            console.log(`🆕 Registering new user: ${phone}`);
            user = await User.create({ 
                phone, 
                role: 'Member', // Default role
                status: 'Online' 
            });
        }

        // ✨ SUCCESS: Now both new and old users will trigger this
        console.log(`✨ SUCCESS: OTP for ${phone} is [ ${generatedOtp} ]`);
        
        res.json({ 
            success: true, 
            otp: generatedOtp, 
            user: user // This now contains the newly created user object
        });

    } catch (error) {
        console.error("❌ Login Error:", error);
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
      { new: true }
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
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to join" });
    }
});

// 4. ✨ FIXED: Upload Medical Report (Ensuring State Updates)
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

    // Use { new: true } so the response contains the updated reports list immediately
const user = await User.findOneAndUpdate(
  { phone: phone },
  { $push: { medicalReports: newReport } },
  { 
    returnDocument: 'after', // ✅ This replaces 'new: true' and stops the warning
    runValidators: true 
  } 
);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    console.log(`✅ [MEDICAL VAULT] Report added for ${phone}`);
    res.json({ success: true, user });
  } catch (error) {
    console.error("🔴 Upload Error:", error);
    res.status(500).json({ success: false, message: "Server error during upload" });
  }
});

// 5. Simulate Alert
app.post('/api/simulate-alert', async (req, res) => {
    try {
        const { userId, status } = req.body;
        const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
        res.json({ success: true, message: `Status updated to ${status}`, user });
    } catch (error) {
        res.status(500).json({ success: false });
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