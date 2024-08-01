const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    // console.log(req.headers.authorization)

    try{
        const token = req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token,'sbs 147')
        console.log(verify)
        if(verify)
        {
            next()
        }
    }
    catch(err){
        res.status(401).json({
            msg:'token not authorized'
        })
    }
}