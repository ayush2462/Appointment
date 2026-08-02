import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import { getAllDepartments } from "../controllers/departmentController.js";
import { submitContact } from "../controllers/contactController.js";
import {
  publicGetJobOpenings,
  applyForJob,
  trackApplication,
  uploadFormalityDocument,
} from "../controllers/jobController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/departments", getAllDepartments);
userRouter.post("/contact", submitContact);

// Job Portal Routes (Public)
userRouter.get("/job-openings", publicGetJobOpenings);
userRouter.post("/apply-job", applyForJob);
userRouter.post("/track-application", trackApplication);
userRouter.post("/upload-formality", upload.single("document"), uploadFormalityDocument);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;