const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/signup',(req,res)=>{
    console.log('signup post request')
    // signup code

    User.find({email:req.body.email})
    .then(result=>{
        if(result.length>0)
        {
            return res.status(500).json({
                msg:'an account with this email already exists'
            })
        }
        bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            console.log(err)
            return res.status(500).json({
                error:err
            })
        }

        console.log(req.body)
        const newUser = new User({
        _id:new mongoose.Types.ObjectId,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hash
        })
        newUser.save()
        .then(result=>{
            res.status(200).json({
                newUser:result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })

    })

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

    
    
})

router.post('/login',(req,res)=>{
    console.log(req.body)
    User.find({email:req.body.email})
    .then(result=>{
        console.log(result)
        if(result.length<1)
        {
            return res.status(401).json({
                msg:'user does not exist'
            })
        }

        bcrypt.compare(req.body.password,result[0].password,(err,verdict)=>{
            if(!verdict)
            {
                return res.status(401).json({
                    msg:'invalid password'
                })
            }

            // token creation 
            const token = jwt.sign({
                firstName:result[0].firstName,
                lastName:result[0].lastName,
                email:result[0].email,
                userId:result[0]._id
            },
                'sbs 147',
                {
                    expiresIn:"365d"
                }
            )

            res.status(200).json({
                firstName:result[0].firstName,
                lastName:result[0].lastName,
                email:result[0].email,
                userId:result[0]._id,
                token:token
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
    // login code 
})

module.exports = router; 
 