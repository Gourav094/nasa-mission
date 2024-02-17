const http = require('http')
const app = require('./app')
const { loadPlanetData } = require('./models/planet.model')

const PORT = process.env.PORT || 8000

const server = http.createServer(app) 

// here function created for starting sever becoz we need to wait to loading data so use await 
async function startServer() {
    await loadPlanetData()
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.........`)
    })
}

startServer()