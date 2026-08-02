import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true }, // e.g. "APP-XXXXX"
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "jobOpening", required: true },
    jobTitle: { type: String, required: true }, // Store job title snapshot at time of application
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeLink: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Rejected", "Selected", "Hired"],
      default: "Pending",
    },
    formalityDocuments: { type: Array, default: [] }, // Store links to uploaded proofs
    adminNotes: { type: String, default: "" }, // For admin to leave instructions
    date: { type: Number, default: Date.now },
  },
  { minimize: false }
);

const jobApplicationModel =
  mongoose.models.jobApplication ||
  mongoose.model("jobApplication", jobApplicationSchema);

export default jobApplicationModel;
