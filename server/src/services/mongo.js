const mongoose = require('mongoose')

const Mongo_URL = "mongodb+srv://gouravgarg:Gouravgargatlas@nasacluster.sfhdjww.mongodb.net/nasa?retryWrites=true&w=majority&appName=NasaCluster"

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready')
})
mongoose.connection.on('error', (err) => {
    console.log(`error during mongoDB connection :: ${err}`)    
})

async function connectMongo(){
    await mongoose.connect(Mongo_URL)
}

async function disconnectMongo(){
    await mongoose.disconnect(Mongo_URL)
}

module.exports = {
    connectMongo,
    disconnectMongo
}