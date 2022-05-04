let UserModel = require("../models/user")
let bcrypt = require("bcrypt")
let {generateAccessToken,generateRefreshToken} = require('../helpers/generateToken')

let getAll = (req,res)=>{
    
}
let getOne = (req,res)=>{
    
}
let update = (req,res)=>{
    
}
let signup = async (req,res)=>{
    try {
        let existingUser = await UserModel.find({ userId:req.body.userId})
        if(existingUser.length>0){
            return res.status(400).json({errorMsg:"UserID alrady taken"})
        }
        let user = UserModel(req.body)
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
let logout = (req,res)=>{
    
}
let deleteOne = (req,res)=>{
    
}
module.exports={
    getAll,
    getOne,
    update,
    signup,
    login,
    logout,
    deleteOne
}