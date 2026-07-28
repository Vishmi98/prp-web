import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        clientName: { type: String, required: true },
        treatmentName: { type: String, required: true },
        comment: { type: String, required: true },
        profileImagePath: { type: String },
        profileImageId: { type: String },
        rating: { type: Number, default: 5 },
        isPublish: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const SuccessStoryModel =
    mongoose.models.SuccessStory ||
    mongoose.model("SuccessStory", successStorySchema);

export default SuccessStoryModel;