const startGeneralSimulation = require('./generalSimulation');
const triggerFall = require('./fallSimulation');
const triggerSOS = require('./sosSimulation');
const User = require('../models/User');

const runScenario = async (phone, type) => {
    if (type === 'FALL') return await triggerFall(phone);
    if (type === 'SOS') return await triggerSOS(phone);
    
    // Reset to Normal
    return await User.findOneAndUpdate(
        { phone },
        { $set: { status: 'Online', 'vitals.heartRate': 72, 'vitals.spo2': 98 } },
        { returnDocument: 'after' }
    );
};

module.exports = { startGeneralSimulation, runScenario };