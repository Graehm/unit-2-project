const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const userController = require('../controllers/users')

router.post('/') // create
router.get('/') //show
router.get('/') //show all
router.put('/') // updata
router.delete('/') //delete