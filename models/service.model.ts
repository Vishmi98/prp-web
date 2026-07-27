import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        thumbnailImagePath: { type: String },
        thumbnailImageId: { type: String },
        isPublish: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const ServiceModel =
    mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default ServiceModel;