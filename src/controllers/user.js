let UserModel = require("../models/user")
let OrderModel = require("../models/order")
let bcrypt = require("bcrypt")
let jwtVerify=require('../helpers/jwtVerify')
let {generateAccessToken,generateRefreshToken} = require('../helpers/generateToken')
let CustomError = require("../helpers/customError")

let getAll = (req,res)=>{
    
}
let getOne = async(req,res,next)=>{
    try {
        let user = await UserModel.findOne({userId:req.params?.id})
        if(user){
            res.status(200).json({userId:user.userId,username:user.username})
        }else{
            throw new CustomError("User Not Found",404)
        }
    } catch (error) {
        next(error)
    }
}
let update = async(req,res,next)=>{
    try {
        if(UserModel.exists({userId:req.params?.id})){
             if(req.body?.password){
                let user = await UserModel.findOne({userId:req.params?.id})
                user.password=req.body.password
                user.userId=req.body?.userId?req.body.userId:user.userId
                user.username = req.body?.username?req.body.username:user.username
                user.save()
                
            }else{
                let user = await UserModel.findOneAndUpdate({userId:req.params.id},req.body,{runValidators:true})
            }
            res.status(200).json({msg:"Update Succfull"})
        }else{
            throw new CustomError("User Not Found",404)
        }
       
     } catch (error) {
        next(error)
    }
}
let signup = async (req,res)=>{
    try {
        let existingUser = await UserModel.find({ userId:req.body?.userId})
        if(existingUser.length>0){
            return res.status(400).json({errorMsg:"UserID alrady taken"})
        }
        let user = UserModel({username:req.body?.username,userId:req.body?.userId,password:req.body?.password,role:'USER'})
        let response = await user.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({errorMsg:error.message})
    } 
}
let login = async (req,res)=>{
    try {
        let user = await UserModel.findOne({userId:req.body.userId})
        if(user){
            let valid= await bcrypt.compare(req.body.password,user.password)
            if(valid){
                let accessToken = generateAccessToken({userId:user.userId})
                let refreshToken = generateRefreshToken({userId:user.userId})
                await UserModel.findOneAndUpdate({userId:user.userId},{activeRefreshTokens:[...user.activeRefreshTokens,refreshToken]},{runValidators:true})

                return res.status(200).json({userId:user.userId,accessToken,refreshToken})

            }else{
                return res.status(401).json({errorMsg:"Invalid Password"})
            }
        }else{
            return res.status(401).json({errorMsg:"UserID Can NOt Be Found"})
   }
    } catch (error) {
        return res.status(500).json({errorMsg:error.message})    
    }
    
}
let logout = async (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(' ')[1]
        if(token){
            verified = jwtVerify(token,process.env.REFRESH_TOKEN_KEY)
            if(verified){
                let user = await UserModel.findOne({userId:verified.userId})
                let activeRefreshTokens = user.activeRefreshTokens.filter((existingToken)=>{
                    return existingToken!=token
                })
                await UserModel.findOneAndUpdate({userId:verified.userId},{activeRefreshTokens},{runValidators:true})
                return res.status(200).json({msg:"Log-out Successful"})
            }else{
                throw new CustomError("Invalid Token",401)
            }
        }else{
            throw new CustomError("No Token Present",400)
        } 
     } catch (error) {
         next(error)
    }

    
}
let updateToken = async(req,res,next)=>{
    try {
        let refreshToken = req.body.refreshToken
        verified= jwtVerify(refreshToken,process.env.REFRESH_TOKEN_KEY)
        let user =await UserModel.findOne({userId:verified?.userId})
        if(verified && user.activeRefreshTokens.includes(refreshToken)){
            let accessToken = generateAccessToken({userId:user.userId})
            res.status(200).json({accessToken})
        }else{
            throw new CustomError("Invalid Refresh Token",400)
        }
    } catch (error) {
        next(error)
    }
    
}
let getUserOrder = async(req,res,next)=>{
    try {
        if(req.params.id){
            let orders = await OrderModel.find({userId:req.params.id})
            if(orders.length>0){
                res.status(200).json({orders})
            }else{
                throw new CustomError(`No order of user with id ${req.params.id} can be found`,404)
            }
        }else{
            throw new CustomError("No user id found",400)
        }
    } catch (error) {
        next(error)
    }
    
}
let deleteOne = (req,res)=>{
    
}

module.exports={
    getAll,
    getOne,
    getUserOrder,
    update,
    signup,
    login,
    logout,
    updateToken,
    deleteOne
}