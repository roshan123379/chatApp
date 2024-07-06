import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverId: { // Correct spelling here
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



const messageModel = new mongoose.model("Message",messageSchema)

export default messageModel