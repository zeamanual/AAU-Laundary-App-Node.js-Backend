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
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    activeRefreshTokens:{
        type:[String]
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

module.exports= mongoose.model('User',userSchema)