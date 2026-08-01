import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);

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

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || "Appointment Cancelled");
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handlePayOnline = () => {
    toast.info("Payment feature initialized! You can pay online or at the clinic.");
  };

  const generateGoogleCalendarUrl = (docName, slotDate, slotTime) => {
    const parts = slotDate.split("_");
    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];
    const dateStr = `${year}${month}${day}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Doctor+Appointment+with+Dr.+${encodeURIComponent(
      docName
    )}&dates=${dateStr}T100000Z/${dateStr}T103000Z&details=Appointment+booked+via+Prescripto+Doctor+Portal`;
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const activeCount = appointments.filter((item) => !item.cancelled && !item.isCompleted).length;
  const completedCount = appointments.filter((item) => item.isCompleted).length;
  const cancelledCount = appointments.filter((item) => item.cancelled).length;

  const filteredAppointments = appointments.filter((item) => {
    if (filterType === "upcoming") return !item.cancelled && !item.isCompleted;
    if (filterType === "completed") return item.isCompleted;
    if (filterType === "cancelled") return item.cancelled;
    return true;
  });

  if (!token) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center space-y-4">
        <p className="text-xl font-bold text-gray-800">Login Required</p>
        <p className="text-sm text-gray-500">
          Please log in to view your scheduled doctor appointments.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-8 py-2.5 rounded-full font-medium shadow hover:bg-primary-dark transition-all text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track your consultations and view doctor prescriptions
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
          <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100">
            Total: {appointments.length}
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
            Active: {activeCount}
          </div>
          {completedCount > 0 && (
            <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
              Completed: {completedCount}
            </div>
          )}
          {cancelledCount > 0 && (
            <div className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-100">
              Cancelled: {cancelledCount}
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-2 flex-wrap">
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterType === "all"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All ({appointments.length})
        </button>
        <button
          onClick={() => setFilterType("upcoming")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterType === "upcoming"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Upcoming ({activeCount})
        </button>
        <button
          onClick={() => setFilterType("completed")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterType === "completed"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Completed ({completedCount})
        </button>
        <button
          onClick={() => setFilterType("cancelled")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterType === "cancelled"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Cancelled ({cancelledCount})
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="space-y-4">
        {filteredAppointments.map((item, i) => (
          <div
            className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-center border border-gray-100"
            key={i}
          >
            {/* Doctor Image */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 bg-indigo-50 rounded-xl overflow-hidden border border-indigo-100">
              <img
                className="w-full h-full object-cover"
                src={item.docData.image}
                alt={`${item.docData.name} profile`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                }}
              />
            </div>

            {/* Appointment Details */}
            <div className="flex-1 text-sm text-gray-700 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <p className="text-xl font-bold text-gray-900">
                  {item.docData.name}
                </p>
                {item.isCompleted ? (
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-0.5 rounded-full border border-blue-100">
                    Completed & Record Sent
                  </span>
                ) : !item.cancelled ? (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-0.5 rounded-full border border-emerald-100">
                    Confirmed & Upcoming
                  </span>
                ) : (
                  <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-0.5 rounded-full border border-red-100">
                    Cancelled
                  </span>
                )}
              </div>

              <p className="text-indigo-600 font-medium text-xs">
                {item.docData.speciality} • Fee:{" "}
                <span className="font-bold">{currencySymbol}{item.amount}</span>
              </p>

              <div className="text-xs text-gray-500 space-y-0.5 pt-1">
                <p className="font-medium text-gray-700">Clinic Address:</p>
                <p>{item.docData.address?.line1}</p>
                <p>{item.docData.address?.line2}</p>
              </div>

              <div className="pt-2">
                <p className="text-xs font-medium text-gray-700">Date & Time:</p>
                <p className="text-sm font-bold text-primary">
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 w-full sm:w-auto">
              {item.isCompleted && (
                <button
                  onClick={() => setSelectedRecord(item)}
                  className="w-full sm:min-w-44 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all text-xs font-semibold shadow-sm"
                >
                  View Prescription & Record
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <>
                  <button
                    onClick={handlePayOnline}
                    className="w-full sm:min-w-44 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all text-xs font-semibold shadow-sm"
                  >
                    Pay Online ({currencySymbol}{item.amount})
                  </button>

                  <a
                    href={generateGoogleCalendarUrl(
                      item.docData.name,
                      item.slotDate,
                      item.slotTime
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:min-w-44 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-xs font-medium text-center"
                  >
                    Add to Calendar
                  </a>

                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="w-full sm:min-w-44 px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all text-xs font-medium"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}

              {item.cancelled && (
                <div className="w-full sm:min-w-44 px-4 py-3 border border-red-200 text-red-500 bg-red-50/50 rounded-xl text-xs font-semibold text-center">
                  Appointment Cancelled
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center space-y-3">
            <p className="text-gray-400 font-medium">No appointments found in this category.</p>
            <button
              onClick={() => navigate("/doctors")}
              className="bg-primary text-white text-xs font-medium px-6 py-2.5 rounded-full shadow hover:bg-primary-dark transition-all"
            >
              Book an Appointment Now
            </button>
          </div>
        )}
      </div>

      {/* Doctor Record / Prescription Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Doctor Record & Prescription
                </h2>
                <p className="text-xs text-gray-500">
                  Dr. {selectedRecord.docData.name} ({selectedRecord.docData.speciality})
                </p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-100">
                <p className="text-xs text-indigo-700 font-semibold uppercase">Consultation Date</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">
                  {slotDateFormat(selectedRecord.slotDate)} at {selectedRecord.slotTime}
                </p>
              </div>

              <div className="space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="font-bold text-gray-800 text-sm">Meeting Notes / Diagnosis:</p>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {selectedRecord.meetingNotes || "Consultation completed successfully."}
                </p>
              </div>

              <div className="space-y-1 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="font-bold text-emerald-800 text-sm">Prescription & Instructions:</p>
                <p className="text-emerald-900 leading-relaxed font-medium">
                  {selectedRecord.prescription || "Follow-up advised as per discussion."}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-semibold shadow hover:bg-primary-dark"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
