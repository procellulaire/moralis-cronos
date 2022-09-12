import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    ipfsImg:String,
    ipfsMetadata:String,
    ipfs3dObject:String,
    createdAt:Date,
    level:Number,
    price:Number
})

const Avatar = mongoose.model("Avatars") || mongoose.model("Avatars",avatarSchema)
export default Avatar;