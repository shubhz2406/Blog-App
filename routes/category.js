const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/categoryModel')
const checkAuth = require('../middlewares/checkAuth')
const jwt = require('jsonwebtoken')


//add category

router.post('/',checkAuth,(req,res)=>{

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')


    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId,
        userId:verify.userId,
        title:req.body.title,
        imageUrl:req.body.imageUrl
    })
    newCategory.save()
    .then(result=>{
        console.log('new category added')
        res.status(200).json({
            newCategory:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// get all category 

router.get('/all',checkAuth,(req,res)=>{
    Category.find()
    .then(result=>{
        res.status(200).json({
            categoryList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:TypeError
        })
    })
})

// get own category

router.get('/',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')

    Category.find({userId:verify.userId})
    .then(result=>{
        res.status(200).json({
            categoryList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete own category 

router.delete('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')

    Category.deleteOne({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.deletedCount==0)
        {
            return res.status(401).json({
                msg:'cannot delete'
            })
        }
        res.status(200).json({
            msg:'deleted succesfully'
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err

        })
    })


})

// update category

router.put('/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'sbs 147')
    console.log(verify)
    Category.findOneAndUpdate({_id:req.params.id,userId:verify.userId},{
        $set:{
            userId:verify.userId,
            title:req.body.title,
            imageUrl:req.body.imageUrl
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


module.exports = router