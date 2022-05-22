let OrderModel = require("../models/order")
let ClothModel = require("../models/cloth")
const CustomError = require("../helpers/customError")
const order = require("../models/order")
let getAll = async (req,res,next)=>{
    try {
        let orders = await OrderModel.find({})
        if(orders.length>0){
            res.status(200).json(orders)
        }else{
            throw new CustomError("NO order Has Been Made Yet.",404)
        }
    } catch (error) {
        next(error)
    }
    
}
let getOne =  async(req,res,next)=>{
    try {
        if(req.params.id){
            let order = await OrderModel.findOne({_id:req.params.id})
            if(order){
                res.status(200).json(order)
            }else{
                throw new CustomError(`No order with id ${req.params.id} found`,404)
            }
        }else{
            throw new CustomError("Invalid Request",400)
        }
      
    } catch (error) {
        next(error)
    }
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
                totalPrice+=(cloth.price*clothes[i].quantity)
            }
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