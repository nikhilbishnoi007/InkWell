import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import postModel from './models/post.js'
import user from './models/user.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server Is Running")
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newuser = await user.create({
            username,
            email,
            password: hash
        })
        let token = jwt.sign({ email }, process.env.SECRET_KEY)
        res.cookie("token", token)
        res.status(201).json({
            success: true,
            data: newuser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const finduser = await user.findOne({ email: email })
    if (!finduser) return res.status(404).json({ success: false, message: error.message })
    bcrypt.compare(password, finduser.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email:finduser.email }, process.env.SECRET_KEY)
            res.cookie("token", token)
            res.status(201).json({ success: true ,data:finduser})
        }
        else {
            res.status(404).json({ success: false, message: error.message })
        }
    })
})
app.post("/logout",(req,res)=>{
    res.cookie("token")
    res.status(200).json({success:true,message:"logout"})
})
app.get("/checkauth", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).json({ success: true, user: decoded });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
});

app.post("/save", async (req, res) => {
    const { title, content } = req.body
    try {
        let newpost = await postModel.create({
            title,
            content,
        })
        res.status(201).json({
            success: true,
            data: newpost,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

})
app.get("/getnotes", async (req, res) => {
    try {
        const allNotes = await postModel.find()
        res.status(200).json({
            success: true,
            data: allNotes,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

})
app.get("/getnotes/:id", async (req, res) => {
    const note = await postModel.findById(req.params.id)
    if (!note) {
        return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({
        success: true,
        data: note
    });
})
app.delete("/delete/:id", async (req, res) => {
    const deletenote = await postModel.findByIdAndDelete(req.params.id)
    if (!deletenote) {
        return res.status(404).json({ success: false, message: "Note not found", data: deletenote })
    }
    res.status(200).json({
        success: true,
    })
})
app.listen(port, () => {
    [
        console.log(`server is listening at port:${port}`)
    ]
})