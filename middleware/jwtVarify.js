import jwt from "jsonwebtoken"
import registerModel from "../model/registerModel.js"
const protectRoute = async(req,res,next)=>{

    try {
        const token = req.header("Authorization")
        if(!token){
            res.status(400).send({msg:"token not found"})
        }
        const jwtToken = token.replace("Bearer","").trim()
        // console.log(jwtToken)
        const jwtVarify = jwt.verify(jwtToken, process.env.SECRET)
        // console.log(jwtVarify)

        const userData = await registerModel.findOne({email:jwtVarify.email}).select({password:0})
        // console.log(userData)

        req.user = userData

        next()

    } catch (error) {
        console.log("jwt error")
    }
}

export default protectRoute