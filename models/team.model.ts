import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String },
        specialization: { type: String, required: true },
        profileImagePath: { type: String },
        profileImageId: { type: String },
        socialLinks: {
            linkedin: { type: String, default: "" },
            instagram: { type: String, default: "" },
            facebook: { type: String, default: "" },
        },
        isPublish: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const TeamModel =
    mongoose.models.Team || mongoose.model("Team", teamSchema);

export default TeamModel;