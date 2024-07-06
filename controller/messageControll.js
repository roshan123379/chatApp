import conversationModel from "../model/conversationModel.js";
import messageModel from "../model/messageModel.js"; 


export const sendMessage = async (req, res) => {
    try {
        const { message: messageText } = req.body; 
        const { id: receiverId } = req.params; 
        const { _id: senderId } = req.user; 

        if (!messageText) {
            return res.status(400).send({ error: "message fields are required." });
        }
        if(!receiverId){
            return res.status(400).send({ error: "recieve fields are required." });
            
        }
        if(!senderId){
            return res.status(400).send({ error: "sender fields are required." });
        }

        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] } 
        });

        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId]
            });
        }

      
        let newMessage = await messageModel.create({
            senderId,
            receiverId, 
            message: messageText
        });

        if (newMessage) {
            conversation.message.push(newMessage._id); 
            
        }
        await Promise.all([await conversation.save(), await newMessage.save()])
        
        
        res.status(200).send({ newMessage });
    } catch (error) {
        console.error("sendMessage error", error);
        res.status(500).send({ error: `An error occurred while sending the message: ${error.message}` });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params; 
        const { _id: senderId } = req.user; 
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("message"); 
        if (!conversation) {
            return res.status(200).json({ error: "Conversation not found" });
        }

        res.status(200).json(conversation.message); 
    } catch (error) {
        console.error("getMessage error", error);
        res.status(500).json({ error: "An error occurred while retrieving the messages" });
    }
};


