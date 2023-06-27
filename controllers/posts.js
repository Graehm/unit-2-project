// look at w13 vid 1 7min to see how to make date render correctly 
// look at w13 vid 2 to see how to incorporate data relation in endpoints

const Post = require('../models/post')
const { updateMany } = require('../models/user')

exports.createPost = async function (req, res) {
    try {
        req.body.user = req.user._id
        const post = await Post.create(req.body)
        res.json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showPost = async function (req, res) {
    try {
        const post = await Post.findOne({_id: req.params.id})
        res.json(post)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// show feed? possible to see index of posts from multiple users? 

// edit/update
exports.updatePost

// delete