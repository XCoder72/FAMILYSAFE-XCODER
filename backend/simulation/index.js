const User = require('../models/User');
const getFallData = require('./fallSimulation');
const getSOSData = require('./sosSimulation');
const getVitalData = require('./vitalSimulation');

const runSimulation = async (phone, type) => {
    let updatePayload;

    if (type === 'FALL') updatePayload = getFallData();
    else if (type === 'SOS') updatePayload = getSOSData();
    else if (type === 'CRITICAL') updatePayload = getVitalData('CRITICAL');
    else updatePayload = getVitalData('NORMAL');

    return await User.findOneAndUpdate(
        { phone },
        { $set: updatePayload },
        { returnDocument: 'after' }
    );
};

module.exports = { runSimulation };