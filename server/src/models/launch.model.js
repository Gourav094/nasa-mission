const launches = new Map()
let latestFlightNumber = 100
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('Febuary 19,2024'),
    target: 'Earth',
    customers: 'NASA',
    success: true,
    upcoming: true
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
        customers: ['Gourav', 'NASA'],
        flightNumber: latestFlightNumber,
    }))
}

function existLaunchById(laundId){
    return launches.has(laundId)
}

function abortLaunchById(launchId){
    const abort = launches.get(launchId)
    abort.upcoming = false
    abort.success = false
    return abort
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existLaunchById,
    abortLaunchById
}