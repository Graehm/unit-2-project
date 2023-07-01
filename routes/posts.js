const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const userController = require('../controllers/users')

router.post('/', userController.auth, postController.createPost)
router.get('/:id', userController.auth, postController.showPost)
router.get('/', userController.auth, postController.showPosts)
router.put('/:id', userController.auth, postController.updatePost) 
router.delete('/:id', userController.auth, postController.deletePost)

module.exports = router