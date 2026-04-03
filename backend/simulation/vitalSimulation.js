const getVitalData = (type) => {
    if (type === 'CRITICAL') {
        return { status: 'Online', 'vitals.heartRate': 175, 'vitals.spo2': 88 };
    }
    return { status: 'Online', 'vitals.heartRate': 72, 'vitals.spo2': 98 }; // Normal
};
module.exports = getVitalData;