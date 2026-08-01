import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
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

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5 w-full max-w-6xl">
        {/* Top Cards */}
        <div className="flex flex-wrap gap-5">
          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded border-2 border-gray-100 shadow-sm hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="Doctors" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-400 font-medium">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded border-2 border-gray-100 shadow-sm hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon || assets.appointment_icon}
              alt="Appointments"
            />
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
              <p className="text-gray-400 font-medium">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
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
                  className="rounded-full w-11 h-11 object-cover bg-gray-100"
                  src={item.docData.image}
                  alt={item.docData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                  }}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-900 font-semibold">{item.docData.name}</p>
                  <p className="text-gray-500 font-medium">
                    Patient: <span className="text-gray-700">{item.userData.name}</span> | Date:{" "}
                    <span className="text-primary font-medium">
                      {slotDateFormat(item.slotDate)} ({item.slotTime})
                    </span>
                  </p>
                </div>

                {item.cancelled ? (
                  <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                    Cancelled
                  </span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-7 h-7 cursor-pointer hover:scale-110 transition-all text-red-500"
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                    title="Cancel Appointment"
                  />
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

export default Dashboard;
