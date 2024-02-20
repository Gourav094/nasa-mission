const {getAllLaunches, addNewLaunch, existLaunchById, abortLaunchById} = require("../../models/launch.model")

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches())   
}

function httpAddNewLaunch(req,res){
    const launch = req.body
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error:'missing required property'
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:'Invalid Launch Date'
        })
    }
    addNewLaunch(launch)
    return res.status(201).json(launch)
    
}


function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id)
    if(!existLaunchById(launchId)){
        return res.status(404).json({
            error:'Launch not found'
        })
    }
    const abort = abortLaunchById(launchId)
    return res.status(200).json(abort)
}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}


// To api call use postman or browser -> if using browser formate should be followed for send correct data

// fetch('http://localhost:8000/launch', {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         mission:'nodejs backend',
//         rocket:'hehehhehehe',
//         destination:'kepler-planet -b',
//         launchDate:'Feburary 20,2026'
//     })
// })