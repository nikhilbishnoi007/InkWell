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
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server Is Running")
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(password, salt);
                const newuser = await user.create({
                    username,
                    email,
                    password: hash
                })
                res.status(201).json({
                    success: true,
                    data: newuser,
                });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }


})
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