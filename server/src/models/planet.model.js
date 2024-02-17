const { parse } = require('csv-parse')
const path = require('path')
const fs = require('fs')

const habitablePlanet = []

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}


function loadPlanetData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler-data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', (res) => {
                if (isHabitablePlanet(res)) {
                    // console.log("controlled")
                    habitablePlanet.push(res)
                }
            })
            .on('error', (err) => {
                reject(err)
                console.log(err)
            })
            .on('end', () => {
                console.log("Data successfully captured")
                resolve()
            })
    })
}


module.exports = {
    loadPlanetData,
    planets: habitablePlanet,
}