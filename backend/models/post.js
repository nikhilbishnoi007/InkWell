import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config()
mongoose.connect(process.env.MONGO_DB_URL)

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

export default mongoose.model("post", postSchema);