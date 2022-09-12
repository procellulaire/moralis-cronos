import mongoose from "mongoose";

const gameAssetSchema = new mongoose.Schema({
    type:String, //avatar, paddleboard,land
    assetId:Number, // point to the table for different game assets depend on their type 
    contractAddress:String,
    tokenId:Number,
    name:String,
    description:String,
    rarity:Number,
    minter:String,
    chainId:Number, //point to id at chain table 
    royalty:Number
})

const GameAsset = mongoose.model("GameAssets") || mongoose.model("GameAssets",gameAssetSchema)
export default GameAsset;