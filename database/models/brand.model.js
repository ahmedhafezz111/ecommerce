import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minLength:[2,'too short category name']
    },
    slug:{
        type:String,
        lowerCase:true,
        required:true
    },
    logo:String,
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    }
},{timestamps:true,versionKey:false})


schema.post('init',function (doc) {

    doc.logo="http://localhost:3000/uploads/brands/" + doc.logo
})




export const Brand = mongoose.model('Brand',schema)