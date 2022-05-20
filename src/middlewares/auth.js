const CustomError = require('../helpers/customError')
let jwtVerify = require('../helpers/jwtVerify')
let UserModel = require("../models/user")

let authenticateUser= async(req,res,next)=>{
    let token = req.headers.authorization?.split(' ')[1]
    try {
        if(token){
            let verified = jwtVerify(token,process.env.ACCESS_TOKEN_KEY)
            if(verified){
                let user = await UserModel.findOne({userId:verified.userId})
                req.userRole = user?.role
                req.userId=user.userId
                next()
            }else{
            throw new CustomError("Invalid Access Token",401)
            } 
        }else{
            throw new CustomError("No Access Token Present",400)
        }
    } catch (error) {
        next(error)
    }

}
let isAdmin=(req,res,next)=>{
    try {
        if(req?.userRole == 'ADMIN'){
            next()
        }else{
            throw new CustomError("Not Authorized",403)
        }
    } catch (error) {
        next(error)
    }

}
module.exports = {authenticateUser,isAdmin}