import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        isPublish: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const FAQModel = mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);

export default FAQModel;