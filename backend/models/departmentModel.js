import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "Stethoscope" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const departmentModel =
  mongoose.models.department || mongoose.model("department", departmentSchema);

export default departmentModel;
