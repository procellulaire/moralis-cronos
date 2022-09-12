import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
    ipfsImg:String,
    ipfsMetadata:String,
    ipfs3dObject:String,
    lat:String,
    lng:String,
    country:String,
    state:String,
    city:String,
    createdAt:Date,
    nftToUnlocked:String, //nft address that the land can be unlucked with
    nftTokenIdToUnlock:Number,
    price:Number
})

const Land = mongoose.model("Lands") || mongoose.model("Lands",landSchema)
export default Land;