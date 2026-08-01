import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointmentDoctor,
  doctorDashboard,
  doctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);

doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/appointments", authDoctor, appointmentsDoctor);

doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointmentDoctor);

doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.post("/dashboard", authDoctor, doctorDashboard);

doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/profile", authDoctor, doctorProfile);

export default doctorRouter;
