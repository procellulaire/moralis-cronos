import mongoose from "mongoose";

const nftAssetSchema = new mongoose.Schema({
    name:String,
    description:String,
    contractAddress:String,
    tokenId:Number,
    ipfsUrl:String,
    ipfsMediaUrl:String,
    ipfsMetadataUrl:String,
    createdAt:Date,
    storeId:Number, //point to market place 
    isAvatar:Boolean,
    isMedia:Boolean, // if it is music/movie
    rarity:Number,
    minter:String,
    chainId:Number,
    royalty:Number,
})

const NFTAsset = mongoose.model("NFTAssets") || mongoose.model("NFTAssets",nftAssetSchema)
export default NFTAsset;