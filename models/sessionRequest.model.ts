import mongoose from "mongoose";

const sessionRequestSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        sessionId: { type: Number, required: true },
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

sessionRequestSchema.virtual("sessionInfo", {
    ref: "Session",
    localField: "sessionId",
    foreignField: "id",
    justOne: true,
});

sessionRequestSchema.set("toObject", { virtuals: true });
sessionRequestSchema.set("toJSON", { virtuals: true });

const SessionRequestModel =
    mongoose.models.SessionRequest ||
    mongoose.model("SessionRequest", sessionRequestSchema);

export default SessionRequestModel;