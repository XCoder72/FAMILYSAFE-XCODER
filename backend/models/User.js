const mongoose = require('mongoose');

// --- 📑 MEDICAL REPORT SUB-SCHEMA ---
const medicalReportSchema = new mongoose.Schema({
  reportName: { type: String, required: true },
  doctorName: { type: String, default: 'General Physician' },
  category: { type: String, default: 'Consultation' },
  fileUrl: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// --- 👤 MAIN USER SCHEMA ---
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true }, 
  familyCode: { type: String, default: null },
  role: { type: String, default: 'Member' }, 
  
  name: { type: String, default: '' },           
  email: { type: String, default: '' },          
  emergencyPhone: { type: String, default: '' }, 
  address: { type: String, default: '' },        
  gender: { type: String, default: '' },         
  relation: { type: String, default: '' },       
  memberId: { type: String, default: '' }, 

  status: { 
    type: String, 
    enum: ['Online', 'Offline', 'FALL_ALERT', 'SOS'], 
    default: 'Online' 
  },

  // ✨ Matches Simulator Logic
  vitals: {
    heartRate: { type: Number, default: 0 },
    spo2: { type: Number, default: 0 }, 
    watchBattery: { type: Number, default: 0 },
    steps: { type: Number, default: 0 },
    lastSync: { type: Date, default: Date.now }
  },

  // ✨ Matches Map Logic
  location: {
    lat: { type: Number, default: null }, 
    lng: { type: Number, default: null }, 
    locationName: { type: String, default: 'Locating...' },
    speed: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },

  medicalReports: [medicalReportSchema],
  isSetupComplete: { type: Boolean, default: false }
}, {
  timestamps: true 
});

// --- 🔄 FIX: CRASH-PROOF MIDDLEWARE ---
// Removed 'next' parameter to prevent TypeError
userSchema.pre('save', function() {
  if (this.isModified('vitals')) {
    this.vitals.lastSync = new Date();
  }
});

module.exports = mongoose.model('User', userSchema);