import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import postModel from './models/post.js'
import userModel from './models/user.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin:process.env.FRONTEND_ROUTE,
    credentials: true,
}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server Is Running")
})

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const finduser = await userModel.findOne({ email: email })
    if (finduser) return res.status(404).json({ success: false, message: "user already exist" })
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newuser = await userModel.create({
            username,
            email,
            password: hash
        })
        let token = jwt.sign({ email: email, userid: newuser._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            success: true,
            data: newuser,
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({
                success: false,
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
            });
        }
        res.status(500).json({ success: false, message: error.message })
    }
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const finduser = await userModel.findOne({ email: email })
    if (!finduser) return res.status(404).json({ success: false, message: "user not found" })
    bcrypt.compare(password, finduser.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: finduser.email, userid: finduser._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: isProduction ? "none" : "lax",
                secure: isProduction,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(201).json({ success: true, data: finduser })
        }
        else {
            res.status(404).json({ success: false, message: "email or password is wrong" })
        }
    })
})
app.post("/logout", (req, res) => {
    res.cookie("token")
    res.status(200).json({ success: true, message: "logout" })
})
app.get("/checkauth", (req, res) => {
    res.set("Cache-Control", "no-store");
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
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not logged in" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { title, content, date } = req.body

        let newpost = await postModel.create({
            user: decoded.userid,
            title,
            content,
            date
        })
        const user = await userModel.findById(decoded.userid)
        user.post.push(newpost._id)
        await user.save()
        res.status(201).json({
            success: true,
            data: newpost,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error.message)
    }

})
app.get("/getuser", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not logged in" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded.userid)
        res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "somthing went wrongs" });
    }

})
app.get("/getnotes", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not logged in" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const allNotes = await postModel.find({ user: decoded.userid })
        res.status(200).json({
            success: true,
            data: allNotes,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "somthing went wrongs" });
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
    if (!deletenote ) {
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