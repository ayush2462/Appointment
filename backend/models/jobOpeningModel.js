import mongoose from "mongoose";

const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // e.g. "Full-Time", "Part-Time"
    department: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    date: { type: Number, default: Date.now },
  },
  { minimize: false }
);

const jobOpeningModel =
  mongoose.models.jobOpening || mongoose.model("jobOpening", jobOpeningSchema);

export default jobOpeningModel;
