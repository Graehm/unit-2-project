const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log('serving user end points')
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

describe('Test user CRUD endpoints/routes', () => {
    test('Should create user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'graehm',
                username: 'gfaz',
                email: 'graehm@g.com',
                password: 'pass'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('graehm')
        expect(response.body.user.username).toEqual('gfaz')
        expect(response.body.user.email).toEqual('graehm@g.com')
        expect(response.body).toHaveProperty('token')
    })

    test('Should login user', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'logingfaz',
            email: 'login@g.com',
            password: 'pass'
        })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({
                name: 'graehm',
                username: 'logingfaz',
                email: 'login@g.com',
                password: 'pass'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('graehm')
        expect(response.body.user.username).toEqual('logingfaz')
        expect(response.body.user.email).toEqual('login@g.com')
        expect(response.body).toHaveProperty('token')
    })

    test('Should update user', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'updategfaz',
            email: 'updategraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'graehm',
                username: 'updatedupdategfaz',
                email: 'updatedupdategraehm@g.com',
                password: 'pass'
            })
            expect(response.statusCode).toBe(200)
            // expect(response.body.user.name).toEqual('graehm')
            // expect(response.body.user.username).toEqual('updateupdategfaz')
            // expect(response.body.user.email).toEqual('updatedupdategraehm@g.com')
    })

    test('Should delete user', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'deletegfaz',
            email: 'deletegraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(204)
    })

    test('Should logout user', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'logoutgfaz',
            email: 'logoutgraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()
        
        const response = await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send ({})
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Bye bud')
    })
})