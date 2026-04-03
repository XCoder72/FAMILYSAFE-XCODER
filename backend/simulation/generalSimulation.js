const User = require('../models/User');

const startGeneralSimulation = () => {
    console.log("🚀 Global Heartbeat Active (5s intervals)");

    setInterval(async () => {
        try {
            const members = await User.find({ role: 'Member' });
            if (members.length === 0) return;

            const bulkOps = members.map(member => {
                // Only drift values if the status is 'Online' (Don't overwrite FALL/SOS)
                if (member.status !== 'Online') return null;

                const hrDrift = Math.floor(Math.random() * (78 - 68) + 68);
                const oxDrift = Math.floor(Math.random() * (100 - 97) + 97);
                
                return {
                    updateOne: {
                        filter: { _id: member._id },
                        update: {
                            $set: {
                                'vitals.heartRate': hrDrift,
                                'vitals.spo2': oxDrift,
                                'vitals.steps': (member.vitals?.steps || 0) + Math.floor(Math.random() * 2),
                                'vitals.watchBattery': Math.max(5, (member.vitals?.watchBattery || 80) - 0.01),
                                lastSync: new Date()
                            }
                        }
                    }
                };
            }).filter(op => op !== null);

            if (bulkOps.length > 0) await User.bulkWrite(bulkOps);
        } catch (err) {
            console.error("❌ Heartbeat Error:", err);
        }
    }, 5000);
};

module.exports = startGeneralSimulation;