let jwt = require('jsonwebtoken')
let jwtVerify = (token,key)=>{
    try {
        return jwt.verify(token,key)
    } catch (error) {
        return 
    }
}
module.exports=jwtVerify
