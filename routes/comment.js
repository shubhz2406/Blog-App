const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Comment = require('../models/commentModel')
const checkAuth = require('../middlewares/checkAuth')
const router = express.Router()

// add comment 
router.post('/',checkAuth,(req,res)=>{

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')

    const newComment = new Comment({
        _id:new mongoose.Types.ObjectId,
        userId:verify.userId,
        commentText:req.body.commentText,
        blogId:req.body.blogId

    })
    newComment.save()
    .then(result=>{
        res.status(200).json({
            msg:'comment added successfully'
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// get all comments on a blog
router.get('/all/:id',(req,res)=>{
    Comment.find({blogId:req.params.id})
    .select("_id userId blogId commentText")
    .then(result=>{
        res.status(200).json({
            commentList:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router
