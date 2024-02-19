const launches = new Map()
let latestFlightNumber = 100
const launch = {
    flightNumber: 100,
    mission: '',
    rocket: '',
    launchDate: new Date('Febuary 19,2024'),
    target: '',
    customer: '',
    success: true,
    upocoming: true
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['gourav', 'nasa'],
        flightNumber: latestFlightNumber,
    }))
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}