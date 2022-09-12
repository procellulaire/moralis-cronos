import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    wallet: String,
    createdAt: Date,
    updatedAt: Date,
    username: String,
    password: String,
    avatarId:String 
})

const User = mongoose.model("Users") || mongoose.model("Users",userSchema)

export default User;