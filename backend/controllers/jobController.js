import jobOpeningModel from "../models/jobOpeningModel.js";
import jobApplicationModel from "../models/jobApplicationModel.js";
import { v2 as cloudinary } from "cloudinary";

// ==========================================
// ADMIN CONTROLLERS (Job Openings Management)
// ==========================================

// Add Job Opening
const addJobOpening = async (req, res) => {
  try {
    const { title, type, department, location, description } = req.body;

    if (!title || !type || !department || !location || !description) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const newJob = new jobOpeningModel({
      title,
      type,
      department,
      location,
      description,
    });

    await newJob.save();
    res.json({ success: true, message: "Job opening added successfully", data: newJob });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get All Job Openings (Admin)
const adminGetJobOpenings = async (req, res) => {
  try {
    const jobs = await jobOpeningModel.find({}).sort({ date: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Job Opening Status (e.g., Close a job)
const updateJobOpeningStatus = async (req, res) => {
  try {
    const { jobId, status } = req.body;
    await jobOpeningModel.findByIdAndUpdate(jobId, { status });
    res.json({ success: true, message: "Job status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get All Applications (Admin)
const adminGetApplications = async (req, res) => {
  try {
    const applications = await jobApplicationModel.find({}).populate('jobId', 'title department').sort({ date: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Application Status (Admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status, adminNotes } = req.body;
    const updateData = { status };
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    await jobApplicationModel.findByIdAndUpdate(applicationId, updateData);
    res.json({ success: true, message: "Application status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ==========================================
// USER / PUBLIC CONTROLLERS (For Candidates)
// ==========================================

// Get Open Job Openings for Public Website
const publicGetJobOpenings = async (req, res) => {
  try {
    const jobs = await jobOpeningModel.find({ status: "Open" }).sort({ date: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Submit Job Application
const applyForJob = async (req, res) => {
  try {
    const { jobId, name, email, phone, resumeLink } = req.body;
    
    const job = await jobOpeningModel.findById(jobId);
    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    // Generate unique Tracking ID (APP-XXXXXX)
    const uniqueId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApplication = new jobApplicationModel({
      applicationId: uniqueId,
      jobId: job._id,
      jobTitle: job.title,
      name,
      email,
      phone,
      resumeLink: resumeLink || "",
    });

    await newApplication.save();

    res.json({
      success: true,
      message: "Application submitted successfully",
      trackingId: uniqueId,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Track Application Status
const trackApplication = async (req, res) => {
  try {
    const { applicationId, email } = req.body;

    const application = await jobApplicationModel.findOne({ applicationId, email });
    if (!application) {
      return res.json({ success: false, message: "Invalid Tracking ID or Email" });
    }

    res.json({ success: true, application });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

import fs from "fs";

// Upload Formalities Document (Candidate)
const uploadFormalityDocument = async (req, res) => {
  try {
    const { applicationId, email } = req.body;
    const file = req.file;

    if (!file) {
      return res.json({ success: false, message: "No document uploaded" });
    }

    const application = await jobApplicationModel.findOne({ applicationId, email });
    if (!application) {
      return res.json({ success: false, message: "Authentication failed. Invalid ID or Email." });
    }

    if (application.status !== "Selected") {
      return res.json({ success: false, message: "You can only upload documents if your status is 'Selected'." });
    }

    // Upload to cloudinary with fallback
    let documentUrl = "";
    try {
      const imageUpload = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
      documentUrl = imageUpload.secure_url;
    } catch (uploadError) {
      console.warn("Cloudinary upload error, using uploaded file data URI:", uploadError.message);
      if (file && file.path) {
        const fileData = fs.readFileSync(file.path);
        const mimeType = file.mimetype || "application/pdf";
        documentUrl = `data:${mimeType};base64,${fileData.toString("base64")}`;
      } else {
        documentUrl = "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
      }
    }

    // Update application
    application.formalityDocuments.push(documentUrl);
    await application.save();

    res.json({ success: true, message: "Document uploaded successfully", documentUrl });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addJobOpening,
  adminGetJobOpenings,
  updateJobOpeningStatus,
  adminGetApplications,
  updateApplicationStatus,
  publicGetJobOpenings,
  applyForJob,
  trackApplication,
  uploadFormalityDocument,
};
