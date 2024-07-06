
import registerModel from "../model/registerModel.js"
const getUsers =async (req,res)=>{
    try {

        const loggedInUser = req.user._id

        const users = await registerModel.find({_id:{$ne:loggedInUser}}).select({password:0})
        res.status(200).send({users})
        
    } catch (error) {
        console.log("getuser errro",error)
    }
}
export default getUsers