let mongoose=require('mongoose')
orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    clothes:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Cloth"
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:'pending'
    }
},{timestamps:true})

module.exports= mongoose.model('Order',orderSchema)