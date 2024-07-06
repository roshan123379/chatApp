import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    message:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
        }   
    ]
},
{timestamps:true})

const conversationModel = new mongoose.model("Conversation",conversationSchema)

export default conversationModel