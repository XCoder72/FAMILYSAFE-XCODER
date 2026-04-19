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
    "https://familysafe-xcoder.vercel.app" // 👈 Update this after Vercel deployment
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

// 🚀 HEALTH CHECK / HOME ROUTE
app.get('/', (req, res) => {
    res.status(200).send('🚀 FamilySafe Premium API is Live and Connected!');
});

const server = http.createServer(app);

// 📡 SOCKET.IO OPTIMIZED FOR CLOUD
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
// 📑 ROUTES
// ---------------------------------------------------------

// ✨ NEW: Update Admin/Member Profile Details (Used in AdminSetup.jsx)
app.put('/api/update-profile', async (req, res) => {
    try {
        const { loginPhone, name, email, emergencyPhone, gender, address } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { phone: loginPhone },
            { 
                $set: { 
                    name, 
                    email, 
                    emergencyPhone, 
                    gender, 
                    address,
                    isSetupComplete: true 
                } 
            },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ success: false, message: "Database Error" });
    }
});

// [ ... KEEP YOUR LOGIN, CREATE-NETWORK, JOIN-NETWORK, UPLOAD-REPORT, SIMULATE, & FETCH ROUTES HERE ... ]


// ---------------------------------------------------------
// 📡 SERVER STARTUP (Render Optimized)
// ---------------------------------------------------------
const startApp = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI; 
        
        if (!MONGO_URI) {
            console.error("❌ ERROR: MONGO_URI missing!");
            process.exit(1);
        }

        // Connection with pooling for better performance
        await mongoose.connect(MONGO_URI);
        console.log('🟢 MongoDB Cloud Connected Successfully!');

        // Initialize Biometric Engine
        startGeneralSimulation(); 

        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`🚀 System Engine Live on Port: ${PORT}`);
        });

        io.on('connection', (socket) => {
            console.log('📡 New Client Connected to Socket');
            socket.on('send_message', (data) => {
                socket.broadcast.emit('receive_message', data); 
            });
            socket.on('disconnect', () => {
                console.log('🔌 Client Disconnected');
            });
        });

    } catch (error) {
        console.error('🔴 Startup Error:', error);
        process.exit(1);
    }
};

startApp();