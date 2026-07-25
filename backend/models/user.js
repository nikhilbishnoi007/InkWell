import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONGO_DB_URL)


const userSchema=new mongoose.Schema({
        username:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            required:true
        }
})
export default mongoose.model('user',userSchema)