import mongoose from "mongoose";

const packageRequestSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        packageId: { type: Number, required: true },
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
 
packageRequestSchema.virtual("packageInfo", {
    ref: "Package",
    localField: "packageId",
    foreignField: "id",
    justOne: true,
});

packageRequestSchema.set("toObject", { virtuals: true });
packageRequestSchema.set("toJSON", { virtuals: true });

const PackageRequestModel =
    mongoose.models.PackageRequest ||
    mongoose.model("PackageRequest", packageRequestSchema);

export default PackageRequestModel;