import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { SubCategory } from "../../../database/models/subcategory.model.js";



const addSubCategory = async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subcategory = new SubCategory(req.body)
    await subcategory.save()

    res.json({message:"success",subcategory})
}


const allSubCategories = catchError(async (req,res,next)=>{
    let subcategories = await SubCategory.find()
    res.json({message:"success",subcategories})
}) 

const getSubCategory = catchError(async (req,res,next)=>{
    let subcategory = await SubCategory.findById(req.params.id)
    subcategory || next(new AppError('subcategory not found',404))
    !subcategory || res.json({message:"success",subcategory})
}) 

const updateSubCategory = catchError(async (req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subcategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subcategory || next(new AppError('subcategory not found',404))
    !subcategory || res.json({message:"success",subcategory})
}
) 

const deleteSubCategory = catchError(async (req,res,next)=>{
    let subcategory = await SubCategory.findByIdAndDelete(req.params.id)
    subcategory || next(new AppError('subcategory not found',404))
    !subcategory || res.json({message:"success",subcategory})
}
) 

/*
 if(category==null) return  res.json({message:"category not found"})
 or
category||if(category==null) return  res.json({message:"category not found"})
!category||res.json({message:"success",category})
 */


export{
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}
