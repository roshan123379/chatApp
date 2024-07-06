import mongoose from "mongoose";



const connection = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("success")
    } catch (error) {
        console.log("database connection error")
    }

}
export default connection