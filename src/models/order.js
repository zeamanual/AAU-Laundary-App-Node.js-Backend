let mongoose=require('mongoose')
orderSchema = mongoose.Schema({
    userId:{
        type:String,
        ref:"User"
    },
    clothes:{
        type:[String],
        ref:"Cloth"
    },
    price:{
        type:Number,
        required:[true,'price can not be empty']
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:'pending'
    }
},{timestamps:true})

module.exports= mongoose.model('Order',orderSchema)