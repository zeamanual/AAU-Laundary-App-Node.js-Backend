let mongoose=require('mongoose')

clothDetailSchema={
    name:{
        type:String,
    },
    quantity:{
        type:Number
    }
}

orderSchema = mongoose.Schema({
    userId:{
        type:String,
        ref:"User"
    },
    clothes:{
        type:[clothDetailSchema],
        required:true
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