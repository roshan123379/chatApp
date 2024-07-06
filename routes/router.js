import express from "express"
const router = express.Router()
import {home,login,register,userData} from "../controller/controller.js"
import protectRoute from "../middleware/jwtVarify.js"

router.route("/").get(home)

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/userData").get(protectRoute,userData)

export default router