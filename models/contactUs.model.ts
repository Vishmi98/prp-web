import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactUsModel =
  mongoose.models.ContactUs || mongoose.model("ContactUs", contactUsSchema);

export default ContactUsModel;