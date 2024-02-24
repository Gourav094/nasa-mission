const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const { loadPlanetData } = require('./models/planet.model')

const PORT = process.env.PORT || 8000

const Mongo_URL = "mongodb+srv://gouravgarg:Gouravgargatlas@nasacluster.sfhdjww.mongodb.net/?retryWrites=true&w=majority&appName=NasaCluster"

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready')
})
mongoose.connection.on('error', (err) => {
    console.log("error occured")    
})
// here function created for starting sever becoz we need to wait to loading data so use await 
async function startServer() {
    await mongoose.connect(Mongo_URL)
    await loadPlanetData()
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.........`)
    })
}

startServer()