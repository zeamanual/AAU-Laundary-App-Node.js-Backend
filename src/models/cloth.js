let mongoose = require('mongoose')

let clothSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name cant not be empty']
    },
    price :{
        type:Number,
        required:[true,,'Price can not be empty']

    }
},{timestamps:true})

module.exports= mongoose.model("Cloth",clothSchema)