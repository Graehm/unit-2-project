require('dotenv').config()

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) =>{ //middleware function that verifies/assigns auth token 
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({_id: data._id})
        if(!user){
            throw new Error ('Hey Bud, you happy with that?')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({message: error.message})
    }
} 

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save() // save the user which also hash's the password instead of await User and hash pass.
        const token = await User.generateAuthToken()
        res.json({user, token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.loginUser = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new Error('Hey Bud, your not you')
        }else{
            const token = await user.generateAuthToken()
            res.json({user, token})
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateUser = async (req, res) => {
    try {
        const update = Object.keys(req.body)
        this.updateUser.forEach(update => req.user[update] = req.body[update])
        // const user = await User.findOne({_id: req.user._id})
        await req.user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

