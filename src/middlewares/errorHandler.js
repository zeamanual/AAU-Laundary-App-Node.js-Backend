let CustomError = require("../helpers/customError")

let errorHandler = (error,req,res,next)=>{
    
    if (error instanceof(CustomError)){
        res.status(error.statusCode).json({errorMsg:error.message})
    }else{
        res.status(500).json({errorMsg:error.message})
    }
}

module.exports=errorHandler