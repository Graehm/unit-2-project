require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    posts: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

userSchema.pre('save', async function(next){
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password, 8):
    null;
    next()
})

userSchema.methods.generateAuthToken = async function(){
    this.isLoggedIn = true
    await this.save()
    const token = jwt.sign({_id: this._id}, process.env.SECRET)
    this.token = token
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User