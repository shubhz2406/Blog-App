const express = require('express')
const router = express.Router()

router.post('/signup',(req,res)=>{
    console.log('signup post request')
    // signup code
})

router.post('/login',(req,res)=>{
    console.log('login request received')
    // login code 
})

module.exports = router; 
//BlCmiEUfHl8uZECL 