const planetRouter = require('./routes/planet/planet.router')
const path = require('path')
const express = require('express')
const app  = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(morgan('short'))

app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')))
app.use(planetRouter)

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})


module.exports = app