import departmentModel from "../models/departmentModel.js";
import doctorModel from "../models/doctorModel.js";

// API to add a new department
const addDepartment = async (req, res) => {
  try {
    const { name, description, icon, status } = req.body;

    if (!name || name.trim() === "") {
      return res.json({ success: false, message: "Department name is required" });
    }

    const existingDepartment = await departmentModel.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingDepartment) {
      return res.json({
        success: false,
        message: "Department with this name already exists",
      });
    }

    const departmentData = {
      name: name.trim(),
      description: description ? description.trim() : "",
      icon: icon || "Stethoscope",
      status: status !== undefined ? status : true,
    };

    const newDepartment = new departmentModel(departmentData);
    await newDepartment.save();

    res.json({ success: true, message: "Department Added Successfully", department: newDepartment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all departments with associated doctor counts
const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.find({}).sort({ createdAt: -1 });
    const doctors = await doctorModel.find({});

    // Count doctors for each department by matching doctor's speciality with department name
    const departmentsWithDoctorCount = departments.map((dept) => {
      const doctorCount = doctors.filter(
        (doc) => doc.speciality && doc.speciality.toLowerCase() === dept.name.toLowerCase()
      ).length;
      return {
        ...dept.toObject(),
        doctorCount,
      };
    });

    res.json({ success: true, departments: departmentsWithDoctorCount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update department
const updateDepartment = async (req, res) => {
  try {
    const { deptId, name, description, icon, status } = req.body;

    if (!deptId) {
      return res.json({ success: false, message: "Department ID is required" });
    }

    if (!name || name.trim() === "") {
      return res.json({ success: false, message: "Department name is required" });
    }

    const existing = await departmentModel.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      _id: { $ne: deptId },
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Another department with this name already exists",
      });
    }

    const updatedDepartment = await departmentModel.findByIdAndUpdate(
      deptId,
      {
        name: name.trim(),
        description: description !== undefined ? description.trim() : "",
        icon: icon || "Stethoscope",
        status: status !== undefined ? status : true,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Department Updated Successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to delete department
const deleteDepartment = async (req, res) => {
  try {
    const { deptId } = req.body;

    if (!deptId) {
      return res.json({ success: false, message: "Department ID is required" });
    }

    await departmentModel.findByIdAndDelete(deptId);
    res.json({ success: true, message: "Department Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
