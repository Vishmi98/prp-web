import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for TypeScript type safety
export interface IPackage extends Document {
    id: number;
    name: string;
    price: number;
    link?: string;
    category?: ("Hair" | "Skin" | "Scalp" | "Face")[];
    sessionsCount?: number;
    isPublish?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const packageSchema = new Schema<IPackage>(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Package name is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        link: {
            type: String,
            trim: true,
            default: null,
        },
        category: {
            type: [String],
            enum: ["Hair", "Skin", "Scalp", "Face"],
            default: [],
        },
        sessionsCount: {
            type: Number,
            default: 0,
        },
        isPublish: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const PackageModel: Model<IPackage> =
    mongoose.models.Package || mongoose.model<IPackage>("Package", packageSchema);

export default PackageModel;