let OrderModel = require("../models/order")
let ClothModel = require("../models/cloth")
const CustomError = require("../helpers/customError")
let getAll = (req,res)=>{
    
}
let getOne = (req,res)=>{
    
}
let update = (req,res)=>{
    
}
let create = async (req,res,next)=>{
    try {
        let totalPrice = 0
        if(req.body?.clothes){
            let clothes = req.body.clothes
            for(let i =0;i<clothes.length;i++){
                let cloth = await ClothModel.findOne({name:clothes[i].name})
                console.log(cloth)
                totalPrice+=(cloth.price*clothes[i].quantity)
            }
            console.log(totalPrice)
            console.log(req.userId)
            let newOrder = await OrderModel.create({userId:req.userId,clothes,price:totalPrice})
            res.status(200).json(newOrder)
        }else{
            throw new CustomError("Invalid Cloth Lists",400)
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
    update,
    create,
    deleteOne
}