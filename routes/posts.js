const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const userController = require('../controllers/users')

router.post('/', userController.auth, postController.createPost) // create
router.get('/:id', userController.auth, postController.showPost) //show/read
router.get('/allPosts', userController.auth, postController.showAllPosts) //show all
router.put('/:id', userController.auth, postController.updatePost) // updata
router.delete('/:id', userController.auth, postController.deletePost) //delete

module.exports = router