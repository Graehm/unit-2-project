require('dotenv').config()

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({_id: data._id})
        if(!user){
            throw new Error ('Wrong credentials bud')
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
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.loginUser = async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new Error('Gotcha bud!')
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
        update.forEach(update => (req.user[update] = req.body[update]))
        await req.user.save()
        res.json(req.user)
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

exports.logoutUser = async (req, res) => {
    try {
        req.user.isLoggedIn = false
        await req.user.save()
        res.json({message: 'Bye bud'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
