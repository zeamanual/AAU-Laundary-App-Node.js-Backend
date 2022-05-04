let jwt = require('jsonwebtoken')

let generateAccessToken=(data)=>{
    return jwt.sign(data,process.env.ACCESS_TOKEN_KEY,{expiresIn:'15m'})
}
let generateRefreshToken=(data)=>{
    return jwt.sign(data,process.env.ACCESS_TOKEN_KEY)
}
module.exports={generateAccessToken,generateRefreshToken}