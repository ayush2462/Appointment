import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();
//middleware

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log("Server connected to", port);
});
