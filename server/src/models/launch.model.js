const launchesData = require('./launch.mongo')
const planets= require('./planets.mongo')

const launches = new Map()

let latestFlightNumber = 100
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('Febuary 19,2024'),
    target: 'Kepler-442 b',
    customers: 'NASA',
    success: true,
    upcoming: true
}

saveLaunch(launch)
launches.set(launch.flightNumber, launch)

async function getAllLaunches() {
    // return Array.from(launches.values())
    return await launchesData.find({},{
        '_id':0,'__v':0
    })
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName:launch.target
    })
    if(!planet){
        throw new Error(`No matching planet found`)
    }
    try{
        await launchesData.updateOne({
            flightNumber:launch.flightNumber
        },launch,{
            upsert:true
        })
    }
    catch(err){
        console.log(`Error during updating launch planet :: ${err}`)
    }
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