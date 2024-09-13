import { AppError } from "../utils/appError.js"



export const catchError = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            next(new AppError(err,500))
        })
    }
}


// export const globalError=(err,req,res,next)=>{
//     return res.status(err.statusCode || 500).json({message:err.message,success:false})


// }