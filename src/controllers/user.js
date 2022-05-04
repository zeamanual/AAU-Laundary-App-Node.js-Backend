let UserModel = require("../models/user")

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

        }
    } catch (error) {
        
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