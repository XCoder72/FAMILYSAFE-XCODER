const User = require('../models/User');

const triggerFall = async (phone) => {
    return await User.findOneAndUpdate(
        { phone },
        {
            $set: {
                status: 'FALL_ALERT',
                'vitals.heartRate': 132, // Rapid heart rate post-fall
                'vitals.spo2': 94,
                'location.locationName': 'Floor - Bedroom'
            }
        },
        { returnDocument: 'after' }
    );
};

module.exports = triggerFall;