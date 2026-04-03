const User = require('../models/User');

const triggerSOS = async (phone) => {
    return await User.findOneAndUpdate(
        { phone },
        {
            $set: {
                status: 'SOS',
                'vitals.heartRate': 110,
                'location.locationName': 'External - Garden Area'
            }
        },
        { returnDocument: 'after' }
    );
};

module.exports = triggerSOS;