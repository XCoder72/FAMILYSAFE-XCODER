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

// Add this above your login route
app.get('/', (req, res) => {
    res.send('🚀 FamilySafe Premium API is Live and Connected!');
});

// 🛠️ UPDATED MIDDLEWARE FOR DEPLOYMENT
app.use(cors({
    // 👈 Replace with your actual Vercel URL once you deploy the frontend
    origin: ["http://localhost:5173", "https://your-frontend-name.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); 

const server = http.createServer(app);
const io = new Server(server, {
    cors: { 
        origin: ["http://localhost:5173", "https://your-frontend-name.vercel.app"], 
        methods: ["GET", "POST"] 
    }
});

// 🛡️ CLOUDINARY SETUP (Stays the same)
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

// [ ... KEEP ALL YOUR ROUTES (1 to 6) EXACTLY AS THEY ARE ... ]

// ---------------------------------------------------------
// 📡 SERVER STARTUP (Optimized for Render)
// ---------------------------------------------------------
const startApp = async () => {
    try {
        // 👈 Ensure your MongoDB Atlas string is in the .env file as MONGO_URI
        const MONGO_URI = process.env.MONGO_URI; 
        
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing in Environment Variables!");
        }

        await mongoose.connect(MONGO_URI);
        console.log('🟢 MongoDB Cloud Connected Successfully!');

        startGeneralSimulation(); 

        // 👈 Render provides the PORT automatically
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`🚀 System Live on Port: ${PORT}`);
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