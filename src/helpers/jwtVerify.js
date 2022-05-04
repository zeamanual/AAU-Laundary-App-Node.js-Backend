let jwt = require('jsonwebtoken')
let jwtVerify = (token,key)=>{
    return jwt.verify(token,key)

}
module.exports=jwtVerify