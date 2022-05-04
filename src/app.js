let express = require('express')
require('dotenv').config()
let conncet =require('./config/db')
let ClothModel = require('./models/cloth')
let OrderModel = require('./models/order')
let UserModel = require("./models/user")

let app = express()
conncet(app)












// app.listen(process.env.PORT,console.log(`Server is listing on port ${process.env.PORT}`))

let test = async()=>{
    try {
        // UserModel.create({
        //     userId:"UGR/8657/12",
        //     username:"Zeamanual Feleke",
        //     password:'passwordd'
        // })
    //   let response = await OrderModel.create({
    //       userID:'627230cc38190dab740dda15',
    //       clothes:['62722a8d8fa3871e85a01164']



    //   })
        let response = await OrderModel.findById("627231aafd85f722ccd268ae").populate('userID').populate('clothes')
        console.log(response)
    } catch (error) {
        console.log(error.message)
        
    }
}
test()