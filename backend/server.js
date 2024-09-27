import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints

app.get("/", (req, res) => {
  res.send("hello world! Ayush");
});
app.listen(port, () => console.log("Server is Started", port));
