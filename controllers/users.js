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
            throw new Error ('Incorrect user or password')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({message: error.message})
    }
} 

