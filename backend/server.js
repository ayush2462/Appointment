import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();
//middleware

app.use(express.json());
app.use(cors());

//api endpoint
app.use('/api/admin',adminRouter)
//localhost:3000/api/admin/add-doctor 

app.get("/", (req, res) => {
  res.send("hello world how are you");
});
app.listen(port, () => {
  console.log("Server connected to", port);
});
