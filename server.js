const http = require('http')
const port = 8000
const app = require('../Blog App Backend/app')

const server = http.createServer(app)
server.listen(port,()=>{console.log("app is running on post"+port)}) 
