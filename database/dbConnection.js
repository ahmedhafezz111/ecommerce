import { connect } from "mongoose";

export const dbConn = connect('mongodb://localhost:27017/e-commerce')
.then(()=>{
    console.log('database connected successfully');

})