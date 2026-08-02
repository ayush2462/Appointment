import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Stethoscope,
  X,
} from "lucide-react";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const calculateAge = (dob) => {
    if (!dob || dob === "Not Selected") return "-";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age > 0 ? age : "-";
  };

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.userData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.docData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.docData.speciality.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "Upcoming") return !item.cancelled && !item.isCompleted;
    if (statusFilter === "Completed") return item.isCompleted;
    if (statusFilter === "Cancelled") return item.cancelled;
    return true;
  });

  const upcomingCount = appointments.filter((a) => !a.cancelled && !a.isCompleted).length;
  const completedCount = appointments.filter((a) => a.isCompleted).length;
  const cancelledCount = appointments.filter((a) => a.cancelled).length;

  return (
    <div className="w-full max-w-7xl m-5 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2.5">
            <CalendarCheck className="w-7 h-7 text-primary" />
            All Patient Appointments & Records
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            System-wide log of upcoming patient bookings, completed consultations, and receipts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="bg-indigo-50 text-primary px-3 py-1.5 rounded-xl border border-indigo-100 shadow-xs">
            Total: {appointments.length}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100 shadow-xs">
            Upcoming: {upcomingCount}
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100 shadow-xs">
            Completed: {completedCount}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient name, doctor name, or speciality..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          {["All", "Upcoming", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`flex-1 md:flex-initial px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                statusFilter === st
                  ? "bg-white text-primary shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List Container */}
      <div className="bg-white border border-gray-200/90 rounded-2xl text-sm max-h-[75vh] min-h-[50vh] overflow-y-auto shadow-xs">
        <div className="hidden lg:grid grid-cols-[0.4fr_2.5fr_0.8fr_2.5fr_2.5fr_1fr_1.2fr] py-3.5 px-6 border-b bg-gray-50/80 text-gray-500 font-bold text-xs uppercase tracking-wider sticky top-0 z-10 backdrop-blur-xs">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Slot</p>
          <p>Assigned Doctor</p>
          <p>Fee (₹)</p>
          <p className="text-right">Status / Actions</p>
        </div>

        {filteredAppointments.map((item, index) => {
          const isCompleted = item.isCompleted;
          const isCancelled = item.cancelled;

          return (
            <div
              className="flex flex-col lg:grid lg:grid-cols-[0.4fr_2.5fr_0.8fr_2.5fr_2.5fr_1fr_1.2fr] items-start lg:items-center text-gray-700 py-4 px-6 border-b border-gray-100 hover:bg-gray-50/70 transition-colors gap-3 lg:gap-0"
              key={index}
            >
              <p className="hidden lg:block font-semibold text-gray-400 text-xs">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200"
                  src={item.userData.image}
                  alt={item.userData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/profile_pic.png";
                  }}
                />
                <div>
                  <p className="font-bold text-gray-900 leading-snug">{item.userData.name}</p>
                  <p className="text-[11px] text-gray-500">{item.userData.email}</p>
                </div>
              </div>

              {/* Age */}
              <p className="hidden lg:block text-xs font-semibold text-gray-600">
                {calculateAge(item.userData.dob)} yrs
              </p>

              {/* Date & Time */}
              <div>
                <p className="text-xs font-bold text-gray-800">
                  {slotDateFormat(item.slotDate)}
                </p>
                <p className="text-[11px] font-semibold text-primary">{item.slotTime}</p>
              </div>

              {/* Doctor Info */}
              <div className="flex items-center gap-3">
                <img
                  className="w-9 h-9 rounded-full object-cover bg-indigo-50 border border-indigo-100"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div>
                  <p className="font-bold text-gray-900 leading-snug">{item.docData.name}</p>
                  <p className="text-[11px] text-primary font-semibold">{item.docData.speciality}</p>
                </div>
              </div>

              {/* Fee */}
              <p className="font-extrabold text-emerald-600 text-sm">₹{item.amount}</p>

              {/* Status / Actions */}
              <div className="w-full lg:w-auto flex items-center lg:justify-end">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : isCancelled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-200">
                    <XCircle className="w-3.5 h-3.5" /> Cancelled
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold transition flex items-center gap-1 border border-rose-200/60"
                    title="Cancel Appointment"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel Slot
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-medium">
            No appointment records found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;
