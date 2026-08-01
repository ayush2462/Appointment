import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);

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

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5 w-full max-w-6xl">
        {/* Metric Cards */}
        <div className="flex flex-wrap gap-5">
          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded border-2 border-gray-100 shadow-sm hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="Earnings" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                ₹{dashData.earnings}
              </p>
              <p className="text-gray-400 font-medium">Total Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded border-2 border-gray-100 shadow-sm hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} alt="Appointments" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-400 font-medium">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded border-2 border-gray-100 shadow-sm hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-gray-400 font-medium">Patients Treated</p>
            </div>
          </div>
        </div>

        {/* Recent Patient Bookings */}
        <div className="bg-white border rounded mt-8 shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-50">
            <img src={assets.list_icon} alt="List" />
            <p className="font-semibold text-gray-700 text-base">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3.5 gap-4 hover:bg-gray-50 transition-colors"
                key={index}
              >
                <img
                  className="rounded-full w-11 h-11 object-cover bg-indigo-50"
                  src={item.userData.image}
                  alt={item.userData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                  }}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-900 font-semibold">{item.userData.name}</p>
                  <p className="text-gray-500 font-medium text-xs">
                    Booking Date:{" "}
                    <span className="text-primary font-medium">
                      {slotDateFormat(item.slotDate)} ({item.slotTime})
                    </span>{" "}
                    • Fee: <span className="text-green-600 font-bold">₹{item.amount}</span>
                  </p>
                </div>

                {item.cancelled ? (
                  <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                    Completed & Sent
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => completeAppointment(item._id, "Consultation completed successfully.", "Follow-up advised.")}
                      className="px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-full text-xs font-semibold"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-full text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}

            {dashData.latestAppointments.length === 0 && (
              <p className="text-center py-6 text-gray-400 font-medium">
                No recent bookings found.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
