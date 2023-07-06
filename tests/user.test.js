const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log('Test some Hey Bud users')
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
            .post('/users')
            .send({
                name: "Bud",
                username: "yourBud",
                email: "bud@buddy.com",
                password: "imABud"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Bud')
        expect(response.body.user.username).toEqual('yourBud')
        expect(response.body.user.email).toEqual('bud@buddy.com')
        expect(response.body).toHaveProperty('token')
    })

    test('Should login user', async () => {
        const user = new User ({
            name: 'Bud',
            username: 'yourBud',
            email: "bud@buddy.com", 
            password: 'imABud'
        })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({
                name: 'Bud',
                username: 'yourBud',
                email: "bud@buddy.com",
                password: 'imABud'
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Bud')
        expect(response.body.user.username).toEqual('yourBud')
        expect(response.body.user.email).toEqual('bud@buddy.com')
        expect(response.body).toHaveProperty('token')
    })

    test('Should update user', async () => {
        const user = new User ({
            name: "heyBud", 
            username: "heyYourBud",
            email: "bud@buddy.com", 
            password: "heyImABud"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "heyBud", 
                username: "YourBud",
                email: "buddy@bud.com", 
                password: "heyImABud"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.user.name).toEqual('heyBud')
            expect(response.body.user.username).toEqual('yourBud')
            expect(response.body.user.email).toEqual('buddy@bud.com')
    })

    test('Should delete user', async () => {
        const user = new User ({
            name: "Bud", 
            username: "yourBud",
            email: "bud@buddy.com", 
            password: "imABud"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
    })

    test('Should logout user', async () => {
        const user = new User ({
            name: "Bud", 
            username: "yourBud",
            email: "bud@buddy.com", 
            password: "imABud"
        })
        await user.save()
        const token = await user.generateAuthToken()
        
        const response = await request(app)
            .post('users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send ({})
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('logged out Bud')
    })
})