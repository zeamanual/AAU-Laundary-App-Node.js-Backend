const CustomError = require('../helpers/customError')
let ClothModel = require('../models/cloth')
let OrderModel = require('../models/order')
let UserModel = require("../models/user")

let getAll = async (req,res,next)=>{
    try {
         let clothes= await ClothModel.find({})
         if(clothes.length<1){
             throw new CustomError("No cloth found",404)
         }
         res.status(200).json({clothes})
    } catch (error) {
        next(error)
    }   
}
let getOne =async (req,res,next)=>{
    let id = req.params?.id
    try {
        if(id){

        
            let cloth = await ClothModel.findOne({name:id})
            if(cloth){
                res.status(200).json({cloth})
            }else{
                throw new CustomError(`No Cloth With name ${id}`,404)
            }
        }else{
            throw new CustomError("Invalid id",400)
        }
        
    } catch (error) {
        next(error)
    }
    
}
let update = async(req,res,next)=>{
    try {
        if(req.params.id){
            let existing = await ClothModel.findOne({name:req.params.id})
            if(existing){
               await ClothModel.findOneAndUpdate({name:req.params.id},req.body,{runValidators:true})
               res.status(200).json({msg:"Operation Sucessful"})
            }else{
                throw new CustomError(`No cloth with name ${req.params.id} found`,404)
            }
        }else{
            throw new CustomError("Invalid id",400)
        }
    } catch (error) {
        next(error)
    }
}
let create = async (req,res,next)=>{
    try {
        if(req.body.name && req.body.price){

            let existing = await ClothModel.find({name:req.body?.name})
            if(existing.length>0){
                throw new CustomError("Cloth Name Already Exists",400)
            }
            let created =  ClothModel({name:req.body.name,price:req.body.price})
            let response = await created.save()
            res.status(201).json(response)
        }
        else{
            throw new CustomError("Invalid Input",400)
        }
       
    } catch (error) {
        next(error)
    }
    
}
let deleteOne = async(req,res,next)=>{
    try {
        let existing = await ClothModel.findOne({name:req.params?.id})
        if(existing){
            await ClothModel.findByIdAndDelete(existing._id)
           return res.status(200).json({msg:"Operation Successful"})
        }
        else{
            throw new CustomError(`Cloth name ${req.params.id} not found`,404)
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