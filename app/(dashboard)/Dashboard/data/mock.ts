export const attendanceData = [
    { month: 'Jan', late: 350, entryLevel: 300, absent: 380 },
    { month: 'Feb', late: 280, entryLevel: 200, absent: 320 },
    { month: 'Mar', late: 250, entryLevel: 180, absent: 350 },
    { month: 'Apr', late: 300, entryLevel: 220, absent: 380 },
    { month: 'May', late: 320, entryLevel: 240, absent: 350 },
    { month: 'Jun', late: 380, entryLevel: 280, absent: 400 },
    { month: 'Jul', late: 360, entryLevel: 350, absent: 380 },
    { month: 'Aug', late: 340, entryLevel: 320, absent: 350 },
    { month: 'Sep', late: 280, entryLevel: 240, absent: 320 },
    { month: 'Oct', late: 220, entryLevel: 180, absent: 280 },
    { month: 'Nov', late: 200, entryLevel: 160, absent: 240 },
    { month: 'Dec', late: 180, entryLevel: 140, absent: 220 },
];

export const monitoringData = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    time: `${14 + i}:${20 + i * 5}`,
    checkIn: `0${3 + i}:0${6 + i}:${30 + i * 2}`,
    location: ['Riyadh', 'Dubai', 'Jeddah', 'Abu Dhabi', 'Doha'][i],
    isCheckedIn: i < 3,
}));