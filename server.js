const http = require('http')
const app = require('../Blog App Backend/app')

require('dotenv').config()
const port = process.env.PORT || 8000

const server = http.createServer(app)

server.listen(port,()=>{
    console.log("app is running on post"+port)
}) 
