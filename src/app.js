require('dotenv').config()
let express = require('express')
let conncet =require('./config/db')
let userRoute = require('./routes/user')
let orderRoute = require('./routes/order')
let clothRoute = require('./routes/cloth')
let errorHandler= require('./middlewares/errorHandler')

let {authenticateUser,isAdmin} = require("./middlewares/auth")

let app = express()
conncet(app)
app.use(express.json())
app.use('/user',userRoute)
app.use('/order',authenticateUser,orderRoute)
app.use('/cloth',clothRoute)
app.get('/test',authenticateUser,isAdmin,(req,res,next)=>{
    res.send("hellow test")
})
app.use(errorHandler)

