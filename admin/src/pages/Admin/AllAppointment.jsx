import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

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

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium text-gray-700">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3.5 px-6 border-b bg-gray-50 text-gray-600 font-semibold">
          <p>#</p>

          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3.5 px-6 border-b hover:bg-gray-50 transition-colors"
            key={index}
          >
            <p className="max-sm:hidden font-medium">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                className="w-9 h-9 rounded-full object-cover bg-gray-100"
                src={item.userData.image}
                alt={item.userData.name}
              />
              <p className="font-medium text-gray-900">{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p className="text-gray-700 font-medium">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-3">
              <img
                className="w-9 h-9 rounded-full object-cover bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name}
              />
              <p className="font-medium text-gray-900">{item.docData.name}</p>
            </div>

            <p className="font-semibold text-green-600">₹{item.amount}</p>

            {item.cancelled ? (
              <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100 w-fit">
                Cancelled
              </span>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-[28px] h-[28px] cursor-pointer hover:scale-110 transition-all text-red-500"
                src={assets.cancel_icon}
                alt="Cancel Appointment"
                title="Cancel Appointment"
              />
            )}
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="text-center py-10 text-gray-400 font-medium">
            No appointments booked yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;
