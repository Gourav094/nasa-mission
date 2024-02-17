const express = require('express')
const planetRouter = express.Router()

const {getAllPlanets} = require('./planet.controller')

planetRouter.get('/planet',getAllPlanets)

module.exports = planetRouter