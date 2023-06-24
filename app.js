const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

module.exports = app