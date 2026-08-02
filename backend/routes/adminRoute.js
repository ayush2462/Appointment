import express from "express";
import {
  addDoctor,
  allDoctors,
  deleteDoctor,
  editDoctor,
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
import {
  addDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import {
  getAllContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import {
  addJobOpening,
  adminGetJobOpenings,
  updateJobOpeningStatus,
  adminGetApplications,
  updateApplicationStatus,
} from "../controllers/jobController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);

adminRouter.post("/delete-doctor", authAdmin, deleteDoctor);
adminRouter.post("/edit-doctor", authAdmin, editDoctor);

// Department Master Routes
adminRouter.post("/add-department", authAdmin, addDepartment);
adminRouter.get("/departments", authAdmin, getAllDepartments);
adminRouter.post("/departments", authAdmin, getAllDepartments);
adminRouter.post("/update-department", authAdmin, updateDepartment);
adminRouter.post("/delete-department", authAdmin, deleteDepartment);

// Contact Inquiry Routes
adminRouter.get("/contacts", authAdmin, getAllContacts);
adminRouter.post("/contacts", authAdmin, getAllContacts);
adminRouter.post("/update-contact-status", authAdmin, updateContactStatus);
adminRouter.post("/delete-contact", authAdmin, deleteContact);

// Job Portal Routes
adminRouter.post("/job-openings/add", authAdmin, addJobOpening);
adminRouter.get("/job-openings", authAdmin, adminGetJobOpenings);
adminRouter.post("/job-openings", authAdmin, adminGetJobOpenings);
adminRouter.post("/update-job-opening", authAdmin, updateJobOpeningStatus);
adminRouter.get("/job-applications", authAdmin, adminGetApplications);
adminRouter.post("/job-applications", authAdmin, adminGetApplications);
adminRouter.post("/update-job-application", authAdmin, updateApplicationStatus);

adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/appointments", authAdmin, appointmentsAdmin);

adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
