import mongoose from "mongoose"
const connection =async () => {
    mongoose.connect(process.env.MONGODB_URI!)
    console.log("Database Connected")
}
export default connection