import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    email: String,
    createdAt: Date
})

const Subscription = mongoose.model("Subscriptions") || mongoose.model("Subscriptions",subscriptionSchema)
export default Subscription;