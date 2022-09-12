import mongoose from "mongoose";
const chainSchema = new mongoose.Schema({
    networkName: String,
    description: String,
    isTestnet: Boolean,
    blockExplorerUrl: String,
    rpc: String,
    symbol: String,
    chainId: String,
    moralisChainId: String,
    tatumChainId: String,
    skaleChainId: String
})

const Chain = mongoose.model("Chains") || mongoose.model("Chains",chainSchema)

export default Chain;