import express from "express"

const messageRouter = express.Router()
import protectRoute from "../middleware/jwtVarify.js"
import {sendMessage,getMessage} from "../controller/messageControll.js"


messageRouter.route("/send/:id").post(protectRoute,sendMessage)
messageRouter.route("/get/:id").get(protectRoute,getMessage)

export default messageRouter