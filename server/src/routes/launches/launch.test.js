const request = require('supertest')
const app = require('../../app')
const {connectMongo,disconnectMongo} = require('../../services/mongo')

describe('Test Launch API',() => {

    beforeAll(async () => {
        await connectMongo()
    })

    afterAll(async() => {
        await disconnectMongo()
    })

    describe('Test GET /launches',() => {
        test('it should respond with response 200',async() => {
            const response = await request(app)
            .get('/launches')
            .expect(200)
            // or we can use expect(response.statusCode).toBe(200)
        })
        test('it should check headers to json',async() => {
            const response = await request(app)
            .get('/launches')
            .expect('Content-Type',/json/)
        })
    })
    
    describe('Test Post /launches',() => {
        const launchData = {
            mission:'Learning backend',
            rocket:'ZTM course',
            target:'Kepler-62 f',
            launchDate:'January 4,2025'
        }
        const launchDataWithoutDate = {
            mission:'Learning backend',
            rocket:'ZTM course',
            target:'Kepler-62 f',
        }
        const launchDataWithInvalidDate = {
            mission:'Learning backend',
            rocket:'ZTM course',
            target:'Kepler-62 f',
            launchDate:'hello'
        }
        test('it should respond with 201 success',async() =>{
            const response = await request(app)
            .post('/launches')
            .send(launchData)
            .expect(201)
        })
        test('it should check all properties are correct expect date',async() =>{
            const response = await request(app)
            .post('/launches')
            .send(launchData)
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
        test('it should check date object',async() => {
            const response = await request(app).post('/launches').send(launchData)
            const responseDate = new Date(response.body.launchDate).valueOf
            const requestDate = new Date(launchData.launchDate).valueOf
    
            expect(responseDate).toBe(requestDate)
        })
        test('it should catch missing required properties',async() => {
            const response = await request(app).post('/launches')
            .send(launchDataWithoutDate)
            .expect(400)
            expect(response.body).toStrictEqual({
                error:'missing required property'
            })
        })
        test('it should catch invalid date',async() => {
            const response = await request(app).post('/launches')
            .send(launchDataWithInvalidDate)
            .expect(400)
            expect(response.body).toStrictEqual({
                error:'Invalid Launch Date'
            })
        })
        
    })
    
})