import mongoose from "mongoose";

const giftCardSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        amount: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        imagePath: { type: String },
        imageId: { type: String },
        isPublish: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const GiftCardModel =
    mongoose.models.GiftCard || mongoose.model("GiftCard", giftCardSchema);

export default GiftCardModel;