const Post = require('../models/post')
const User = require('../models/user')

exports.createPost = async function (req, res) {
    try {
        req.body.user = req.user._id
        const post = await Post.create(req.body)
        req.user.post?
        req.user.post.addToSet({_id: post._id}):
        req.user.post = [{_id: post._id}]
        await req.user.save()
        res.json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showMyPost = async function (req, res) {
    try {
        const post = await Post.findOne({_id: req.params.id})
        res.json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showPosts = async function (req, res) {
    try {
        const showPosts = await Post.find({})
        res.json(showPosts)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updatePost = async function (req, res) {
    try {
        const post = await Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deletePost = async function (req, res) {
    try {
        const post = await Post.findOneAndDelete({_id: req.params.id})
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
