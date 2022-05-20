let mongoose = require('mongoose')
let connect = async(app)=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        app.listen(process.env.PORT,console.log(`Server is listing on port ${process.env.PORT}`))
    } catch (error) {
        console.log(error)   
    } 
}
module.exports=connect