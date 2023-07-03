const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log('Test some Hey Buds')
})
const User = require('../models/user')
const Post = require('../models/post')
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test CRUD user endpoints/routes', () => {
    test('Should create user', async () => {
        const response = await request(app)
            .post('/user')
            .send({
                name: "Bud",
                username: "yourBud",
                password: "imABud"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Bud')
        expect(response.body.user.username).toEqual('yourBud')
        expect(response.body).toHaveProperty('token')
    })

    test('Should login user', async () => {
        const user = new User ({
            name: 'Bud',
            username: 'yourBud', 
            password: 'imABud'
        })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({
                name: 'Bud',
                username: 'yourBud',
                password: 'imABud'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Bud')
        expect(response.body.user.username).toEqual('yourBud')
        expect(response.body).toHaveProperty('token')
    })

    test('Should update user', async () => {

    })

    test('Should delete user', async () => {

    })

    test('Should logout user', async () => {
        
    })
})