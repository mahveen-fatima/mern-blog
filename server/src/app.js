import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


// it configs from where should we can allow reqs to backend ( i.e only from frontend) so add the link in env
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// config of what type of reqs we are accepting ( using cookie parser)
// configuring how much data should we take from json
app.use(express.json({limit: "16kb"}))
// configuring how to take data from urls
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// configuration of storing files and images in public file
app.use(express.static("public"))

// configuration of how take users cookie from their browser to backend ( only backend can read or handle the cookies)
app.use(cookieParser())


// import routes

import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"

// routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/post", postRouter)



export {app}