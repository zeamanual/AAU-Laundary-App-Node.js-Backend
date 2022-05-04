let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let userSchema = mongoose.Schema({
    userId:{
        type:String,
        minLength:5,
        maxLength:15,
        required:[true,'Id can not be blank']
    },
    username:{
        type:String,
        minLength:5,
        maxLength:25,
        required:[true,'username can not be blank']
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:20
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    console.log(this.userId)
    this.password = await bcrypt.hash(this.password,10)
    console.log(this.password)
    next()
})

module.exports= mongoose.model('User',userSchema)