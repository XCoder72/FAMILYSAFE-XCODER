const mongoose = require('mongoose');

// Define the Member Schema (Keeping it consistent with your data list)
const memberSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: 'Member' },
  familyCode: String,
  isSetupComplete: { type: Boolean, default: true },
  status: { type: String, default: 'Online' }, 
  vitals: {
    heartRate: Number,
    spo2: Number,
    steps: Number,
    watchBattery: Number
  },
  location: {
    lat: Number,
    lng: Number,
    locationName: String,
    speed: Number
  },
  lastSeen: { type: Date, default: Date.now }
});

// Avoid re-defining the model if it already exists
const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

const startGeneralSimulation = () => {
  console.log("🚀 Global Data Simulator Engine Started...");

  setInterval(async () => {
    try {
      // ✨ Fetches ALL members across ALL families
      const members = await Member.find({ role: 'Member' });

      if (members.length === 0) return;

      const bulkOps = members.map(member => {
        // 1. Randomize Vitals (Humanly realistic ranges)
        const newHR = Math.floor(Math.random() * (82 - 65) + 65); 
        const newSpO2 = Math.floor(Math.random() * (100 - 96) + 96);
        const stepsIncrement = Math.floor(Math.random() * 5); // Add 0-5 steps every 5s

        // 2. Randomize Movement (Drifting around their current point)
        const newLat = member.location?.lat ? member.location.lat + (Math.random() - 0.5) * 0.0002 : 26.2183;
        const newLng = member.location?.lng ? member.location.lng + (Math.random() - 0.5) * 0.0002 : 78.1828;

        // 3. Status Logic (Keep Online unless manually triggered otherwise)
        // We keep it 'Online' here so it doesn't overwrite a manual SOS/Fall trigger from the app
        const currentStatus = (member.status === 'FALL_ALERT' || member.status === 'SOS') 
          ? member.status 
          : 'Online';

        return {
          updateOne: {
            filter: { _id: member._id },
            update: {
              $set: {
                status: currentStatus,
                'vitals.heartRate': newHR,
                'vitals.spo2': newSpO2,
                'vitals.steps': (member.vitals?.steps || 0) + stepsIncrement,
                'vitals.watchBattery': Math.max(5, (member.vitals?.watchBattery || 80) - 0.01),
                'location.lat': newLat,
                'location.lng': newLng,
                'location.speed': (Math.random() * 4).toFixed(1),
                lastSeen: new Date()
              }
            }
          }
        };
      });

      // Execute all updates in one database trip for performance
      await Member.bulkWrite(bulkOps);
      
    } catch (err) {
      console.error("❌ Simulation Engine Error:", err);
    }
  }, 5000); // Global heartbeat every 5 seconds
};

module.exports = { startGeneralSimulation, Member };