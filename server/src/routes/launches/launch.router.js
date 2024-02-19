const express = require('express')
const launchRouter = express.Router()

const {httpAddNewLaunch,httpGetAllLaunches} = require('./launch.controller')

launchRouter.get('/',httpGetAllLaunches)

launchRouter.post('/',httpAddNewLaunch)


module.exports = launchRouter