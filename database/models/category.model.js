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
    image:String,
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    }

},{timestamps:true,versionKey:false})


schema.post('init',function (doc) {

    doc.image="http://localhost:3000/uploads/categories/" + doc.image
})


export const Category = mongoose.model('Category',schema)