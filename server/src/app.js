const planetRouter = require('./routes/planet/planet.router')
const path = require('path')
const express = require('express')
const app  = express()
const cors = require('cors')
const morgan = require('morgan')
const launchRouter = require('./routes/launches/launch.router')

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(morgan('short'))

app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')))
app.use('/planet',planetRouter)
app.use('/launches',launchRouter)

app.get('/*',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})


module.exports = app