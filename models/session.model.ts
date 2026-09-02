import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for TypeScript type safety
export interface ISession extends Document {
    id: number;
    name: string;
    details: string;
    price: number;
    duration: string;
    isPublish?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Session name is required"],
            trim: true,
        },
        details: {
            type: String,
            trim: true,
            required: [true, "Session details are required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        duration: {
            type: String,
            required: [true, "Duration is required"],
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

const SessionModel: Model<ISession> =
    mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);

export default SessionModel;