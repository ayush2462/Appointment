import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  try {
    const baseUrl = process.env.MONGODB_URL.trim().replace(/\/+$/, "");
    await mongoose.connect(`${baseUrl}/prescripto`);
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};
export default connectDB;
