import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [contacts, setContacts] = useState([]);

  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:3000").trim();

  useEffect(() => {
    if (aToken) {
      getContacts();
    }
  }, [aToken]);

  const getContacts = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/contacts", {
        headers: { aToken },
      });
      if (data.success) {
        setContacts(data.contacts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-contact-status",
        { contactId, status },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getContacts();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const deleteContactInquiry = async (contactId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-contact",
        { contactId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getContacts();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const getDepartments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/departments", {
        headers: { aToken },
      });
      if (data.success) {
        setDepartments(data.departments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addDepartment = async (deptData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-department",
        deptData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDepartments();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const updateDepartment = async (deptId, updatedData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-department",
        { deptId, ...updatedData },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDepartments();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const deleteDepartment = async (deptId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-department",
        { deptId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDepartments();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteDoctor = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-doctor",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editDoctor = async (docId, updatedData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/edit-doctor",
        { docId, ...updatedData },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    deleteDoctor,
    editDoctor,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    departments,
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    contacts,
    getContacts,
    updateContactStatus,
    deleteContactInquiry,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
