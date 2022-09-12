// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

// Interface to define our models on the frontend
export interface User {
    _id?: number
    email: string
    wallet: string
    createdAt: Date
    updatedAt: Date
    username: string
    password: string
    avatarId:string // point to avatar collection
}

export interface Chain {
    _id?: number
    networkName: string
    description: string
    isTestnet: boolean
    blockExplorerUrl: string
    rpc: string
    symbol: string
    chainId: string
    moralisChainId: string
    tatumChainId: string
    skaleChainId: string
}

export interface Subscription { //for saving emails on the first page 
    _id?: number
    email: string
    createdAt: Date
}

export interface NftAsset{
    _id:number
    name:string
    description:string
    contractAddress:string
    tokenId:number
    ipfsUrl:string
    ipfsMediaUrl:string
    ipfsMetadataUrl:string
    createdAt:Date
    storeId:number //point to market place 
    isAvatar:boolean
    isMedia:boolean // if it is music/movie
    rarity:number
    minter:string
    chainId:number
    royalty:number
}

export interface GameAssets{ //for searching purpose
    _id?:number
    type:string //avatar, paddleboard,land
    assetId:number // point to the table for different game assets depend on their type 
    contractAddress:string
    tokenId:number
    name:string
    description:string
    rarity:number
    minter:string
    chainId:number //point to id at chain table 
    royalty:number
}

export interface Land{
    _id?:number
    // contractAddress:string
    // tokenId:string
    // name:string
    // description:string
    ipfsImg:string
    ipfsMetadata:string
    ipfs3dObject:string
    lat:string
    lng:string
    country:string
    state:string
    city:string
    createdAt:Date
    nftToUnlocked:string //nft address that the land can be unlucked with
    nftTokenIdToUnlock:number
    price:number
    
}

export interface Avatar{
    _id?:number //can be used as dna for each avatar
    // name:string
    // description:string
    // contractAddress:string
    // tokenId:string
    ipfsImg:string
    ipfsMetadata:string
    ipfs3dObject:string
    createdAt:Date
    level:number
    price:number
}

