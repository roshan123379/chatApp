import express from "express"
import getUsers from "../controller/userController.js"
import protectRoute from "../middleware/jwtVarify.js"
const userRouter = express.Router()
userRouter.route("/").get(protectRoute,getUsers)

export default userRouter