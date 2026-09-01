import mongoose from "mongoose";

const giftCardRequestSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        giftCardId: { type: Number, required: true },
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: ["pending", "contacted", "completed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

giftCardRequestSchema.virtual("giftCardInfo", {
    ref: "GiftCard",
    localField: "giftCardId",
    foreignField: "id",
    justOne: true,
});

giftCardRequestSchema.set("toObject", { virtuals: true });
giftCardRequestSchema.set("toJSON", { virtuals: true });

const GiftCardRequestModel =
    mongoose.models.GiftCardRequest ||
    mongoose.model("GiftCardRequest", giftCardRequestSchema);

export default GiftCardRequestModel;