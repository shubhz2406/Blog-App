const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')
const checkAuth = require('../middlewares/checkAuth')
const jwt = require('jsonwebtoken')

// add new blog
router.post('/',checkAuth,(req,res)=>{


    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')


    const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId,
        userId:verify.userId,
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        content:req.body.content,
        categoryTitle:req.body.categoryTitle,
        categoryId:req.body.categoryId,
        authorName:verify.firstName + " " + verify.lastName
    })
    newBlog.save()
    .then(result=>{
        console.log('new blog added')
        res.status(200).json({
            newBlog:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// get all 

router.get('/all',(req,res)=>{
    Blog.find()
    .select("_id userId categoryId categorytTitle title imageUrl content authorName")
    .then(result=>{
        res.status(200).json({
            blogList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:TypeError
        })
    })
})

// get own 
router.get('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')

    Blog.find({userId:verify.userId})
    .select("_id userId categoryId categoryTitle title imageUrl content authorName")
    .then(result=>{
        res.status(200).json({
            blogList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete own blog 

router.delete('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')

    Blog.deleteOne({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.deletedCount==0)
        {
            return res.status(401).json({
                msg:'cannot delete'
            })
        }
        res.status(200).json({
            msg:'blog post deleted succesfully'
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err

        })
    })


})

// update blog 

router.put('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    console.log(verify)
    Blog.findOneAndUpdate({_id:req.params.id,userId:verify.userId},{
        $set:{
            userId:verify.userId,
            title:req.body.title,
            imageUrl:req.body.imageUrl,
            content:req.body.content,
            categoryTitle:req.body.categoryTitle,
            categoryId:req.body.categoryId,
            authorName:verify.firstName + " " + verify.lastName

        }
    })
    .then(result=>{
        if(result==null)
        {
            return res.status(401).json({
                msg:'cannot update'
            })
        }
        res.status(200).json({
            msg:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })

})

// get blogs by category

router.get('/getByCategory/:id',(req,res)=>{
    Blog.find({categoryId:req.params.id})
    .select("_id userId categoryId categorytTitle title imageUrl content authorName")
    .then(result=>{
        res.status(200).json({
            blogList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:TypeError
        })
    })
})


module.exports = router