import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Responded", "Archived"],
      default: "Pending",
    },
    date: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const contactModel =
  mongoose.models.contact || mongoose.model("contact", contactSchema);

export default contactModel;
