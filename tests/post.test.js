const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log('Testing some posts bud')

})
const User = require('../models/user')
const Post = require('../models/post')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('testing the buddy CRUD post endpoints', () => {
    test('Should create post', async () => {
        const user = new User ({
            name: "Bud",
            username: "yourBud",
            password: "imABud"
        })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post('/posts')
            .set('Athorization', `Bearer ${token}`)
            .send({
                title: "title post", 
                body: "post theme"
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('title post')
        expect(response.body.body).toEqual('post theme')
    })
    
    test('Should show a post', async () => {
        const user = new User ({
            name: "Bud",
            username: "yourBud",
            password: "imABud"
        })
        await user.save()
        const token = await user.generateAuthToken()
        const post = new Post ({
            title: "title post", 
            body: "post theme"
        })
        await post.save()
        const response = await request(app)
            .get(`/posts/${post._id}`)
            .send('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('title post')
        expect(response.body.body).toEqual('post theme')
    })

    test('Should show all posts from one users', async () => {
        const user = new User ({
            name: "Bud",
            username: "yourBud",
            password: "imABud"
        })
        await user.save()
        const token = await user.generateAuthToken()
        const post = new Post ({
            title: "title post", 
            body: "post theme"
        })
        await post.save()
        const response = await request(app)
            .get('/posts')
            .send('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('title post')
        expect(response.body.body).toEqual('post theme')
    })

    test('Should update a post', async () => {

    })

    test('Should delete a post', async () => {

    })
})

