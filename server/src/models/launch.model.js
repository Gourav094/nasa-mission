const launchesData = require('./launch.mongo')
const planets = require('./planets.mongo')

const Default_Flight_Number = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('Febuary 19,2024'),
    target: 'Kepler-442 b',
    customers: 'Gourav',
    success: true,
    upcoming: true
}

saveLaunch(launch)

async function getAllLaunches() {
    return await launchesData.find({}, {
        '_id': 0, '__v': 0
    })
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName:launch.target
    })
    if(!planet){
        throw new Error(`No matching planet found`)
    }
    await launchesData.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function getLatestFlightNumber() {
    const latest = await launchesData.findOne().sort('-flightNumber')
    if (!latest) {
        return Default_Flight_Number
    }
    return latest.flightNumber
}

async function scheduleNewLaunch(launch) {
    const latestFlight = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Gourav', 'NASA'],
        flightNumber: latestFlight,
    })
    await saveLaunch(newLaunch)
}


async function existLaunchById(launchId) {
    return await launchesData.findOne({
        flightNumber: launchId
    })
}

async function abortLaunchById(launchId) {
    const aborted = await launchesData.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    })
    return aborted.modifiedCount === 1
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existLaunchById,
    abortLaunchById
}