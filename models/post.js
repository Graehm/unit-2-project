const {model, schema} = require('mongoose')

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}, 
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}  
}, {
    created: {type: Date, default: Date.now}
})

const Post = model('Post', postSchema)
module.exports = Post