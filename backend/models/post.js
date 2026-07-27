import mongoose from "mongoose";
import dotenv from 'dotenv'


// dotenv.config()
// mongoose.connect(process.env.MONGO_DB_URL)

const postSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("post", postSchema);