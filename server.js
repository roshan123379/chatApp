import express from "express"
const app = express()
import dotenv from "dotenv"
import cors from "cors"
const corOptions = {
    origin:"https://chatterrs.netlify.app",
    methods:"GET ,POST ,PUT ,DELETE,PATCH",
    Credential:true


}
app.use(cors(corOptions))
dotenv.config()
import connection from "./utils/db.js"

import router from "./routes/router.js"
import messageRouter from "./routes/messageRoutes.js"
import userRouter from "./routes/userRouter.js"


const PORT = process.env.PORT
app.get("/",(req,res)=>{
    res.send("hello app")
})
app.use(express.json())
app.use("/api/auth",router)
app.use("/api/message",messageRouter)
app.use("/api/userRouter",userRouter)

app.listen(PORT,()=>{
    connection()
})
