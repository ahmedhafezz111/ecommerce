import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { Product } from "../../../database/models/product.model.js";



const addProduct = catchError(async (req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images=req.files.images.map(img=>img.filename)
    let product = new Product(req.body)
    await product.save()
    res.json({message:"success",product})
}) 


const allProducts= catchError(async (req,res,next)=>{
    let products = await Product.find()
    res.json({message:"success",products})
}) 

const getProduct = catchError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    product || next(new AppError('product not found',404))
    !product || res.json({message:"success",product})
}) 

const updateProduct = catchError(async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    product || next(new AppError('product not found',404))
    !product || res.json({message:"success",product})
}
) 

const deleteProduct = catchError(async (req,res,next)=>{
    let product = await Product.findByIdAndDelete(req.params.id)
    product || next(new AppError('product not found',404))
    !product || res.json({message:"success",product})
}
) 


/*
 if(category==null) return  res.json({message:"category not found"})
 or
category||if(category==null) return  res.json({message:"category not found"})
!category||res.json({message:"success",category})
 */


export{
    addProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct
}