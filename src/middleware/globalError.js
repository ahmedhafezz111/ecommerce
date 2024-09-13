let mode = "prod"
export const globalError =(err,req,res,next)=>{
    let code = err.statusCode || 500
    if(mode=='development'){
       
    }else{
         res.status(code).json({error:"error",message:err.message,code})
    }

    
}