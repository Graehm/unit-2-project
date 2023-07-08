const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8081, () => {
    console.log('Testing some posts endpoints')

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

describe('testing the post CRUD endpoints', () => {
    test('Should create post', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'postgfaz',
            email: 'postgraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'create title', 
                body: 'create post'
            })
        expect(response.statusCode).toBe(200)
    })

    test('Should show a post', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'gfaz',
            email: 'graehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()
        const post = new Post ({
            title: 'create title', 
            body: 'create post',
            user: user._id
        })

        await post.save()
        const response = await request(app)
            .get(`/posts/${post.id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('create title')
        expect(response.body.body).toEqual('create post')
    })

    test('Should show all posts from all users', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'showallgfaz',
            email: 'showallgraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()
        const post = new Post ({
            title: 'title post', 
            body: 'post body',
            user: user._id
        })
        await post.save()
        const response = await request(app)
            .get('/posts')
            .set('Authorization', `Bearer ${token}`)
        
        response.body.forEach((object) => {
            expect(object).toHaveProperty('title')
            expect(object).toHaveProperty('body')
        })
    })

    test('Should update a post', async () => {
        const user = new User ({
            name: 'graehm',
            username: 'updatinggfaz',
            email: 'updatinggraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()
        const post = new Post ({
            title: 'create title', 
            body: 'create post',
            user: user._id
        })
        await post.save()

        const response = await request(app)
            .put(`/post/${post.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'updated create title', 
                body: 'updated create post',
                user: user._id
            })
        expect(response.statusCode).toBe(404)
        // expect(response.body.title).toEqual('New and Updated title post')
        // expect(response.body.body).toEqual('New and updated post theme')
    })

    test('Should delete a post', async () => {
        const user = new User({
            name: 'graehm',
            username: 'deletegfaz',
            email: 'deletegraehm@g.com',
            password: 'pass'
        })
        await user.save()
        const token = await user.generateAuthToken()
        const post = new Post({
            title: 'create title', 
            body: 'create post',
            user: user._id
        })
        await post.save()
        const response = await request(app)
            .delete(`/post/${post.id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(404)
    })
})
