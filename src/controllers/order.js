let OrderModel = require("../models/order")
let ClothModel = require("../models/cloth")
const CustomError = require("../helpers/customError")

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
        if(req.params?.id){
            let order = await OrderModel.findOne({_id:req.params?.id})
            if(order){
                res.status(200).json(order)
            }else{
                throw new CustomError(`No order with id ${req.params?.id} found`,404)
            }
        }else{
            throw new CustomError("Invalid Request",400)
        }
      
    } catch (error) {
        next(error)
    }
}
let update = async(req,res,next)=>{
    try {
        let totalPrice = 0
        if(req.body?.clothes && req.params?.id){
            let clothes = req.body.clothes
            for(let i =0;i<clothes.length;i++){
                let cloth = await ClothModel.findOne({name:clothes[i].name})
                totalPrice+=(cloth.price*clothes[i].quantity)
            }
            let newOrder = await OrderModel.findOneAndReplace({_id:req.params.id},{userId:req.userId,clothes,price:totalPrice})
            res.status(200).json(newOrder)
        }else{
            throw new CustomError("Invalid input",400)
        }

    } catch (error) {
        next(error)
    }
    
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
let deleteOne = async(req,res)=>{
    try {
        if(req.params?.id){
            let deleted = await OrderModel.findOneAndDelete({_id:req.params.id})
            if(deleted){
                res.status(200).json({msg:"Operation Sucessfull"})
            }else{
                throw new CustomError(`No Order With Id ${req.params.id}`,404)
            }
        }else{
            throw new CustomError('Invalid path',400)
        }
    } catch (error) {
        next(error)
    }
}
module.exports={
    getAll,
    getOne,
    update,
    create,
    deleteOne
}