const getFallData = () => ({
    status: 'FALL_ALERT',
    'vitals.heartRate': Math.floor(Math.random() * (140 - 120 + 1)) + 120, // High HR
    'vitals.spo2': 94,
    'location.locationName': 'Floor - Bedroom Area'
});
module.exports = getFallData;