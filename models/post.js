require('dotenv').config()
const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}, 
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}  
})

const Post = model('Post', postSchema)
module.exports = Post