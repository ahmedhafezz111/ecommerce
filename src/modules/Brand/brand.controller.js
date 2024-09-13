import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { Brand } from "../../../database/models/brand.model.js";



const addBrand = async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()

    res.json({message:"success",brand})
}


const allBrands= catchError(async (req,res,next)=>{
    let brands = await Brand.find()
    res.json({message:"success",brands})
}) 

const getBrand = catchError(async (req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppError('brand not found',404))
    !brand || res.json({message:"success",brand})
}) 

const updateBrand = catchError(async (req,res,next)=>{
   if(req.body.slug) req.body.slug=slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand || next(new AppError('brand not found',404))
    !brand || res.json({message:"success",brand})
}
) 

const deleteBrand = catchError(async (req,res,next)=>{
    let brand = await Brand.findByIdAndDelete(req.params.id)
    brand || next(new AppError('brand not found',404))
    !brand || res.json({message:"success",brand})
}
) 

/*
 if(category==null) return  res.json({message:"category not found"})
 or
category||if(category==null) return  res.json({message:"category not found"})
!category||res.json({message:"success",category})
 */


export{
    addBrand,
    allBrands,
    getBrand,
    updateBrand,
    deleteBrand
}
