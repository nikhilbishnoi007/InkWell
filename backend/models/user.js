import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONGO_DB_URL)


const userSchema=new mongoose.Schema({
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        post:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }]
})
export default mongoose.model('user',userSchema)