const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const userRoute = require('../Blog App Backend/routes/user')
// const categoryRoute = require('../Blog App Backend/routes/categotry')
// const commentRoute = require('../Blog App Backend/routes/comment')
// const blogRoute = require('../Blog App Backend/routes/blog')

const dbPassword = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://meolessi:${dbPassword}@shubh37.nlkbzju.mongodb.net/?retryWrites=true&w=majority&appName=shubh37`)
.then(res=>{console.log("connected to database")})
.catch(err=>{console.log("failed")})

app.use(bodyParser.json())

app.use('/user',userRoute)
// app.use('/category',categoryRoute)
// app.use('/comment',commentRoute)
// app.use('/blog',blogRoute)




module.exports = app
