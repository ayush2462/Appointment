import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);

  const [selectedApp, setSelectedApp] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");

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
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const openCompleteModal = (app) => {
    setSelectedApp(app);
    setPrescription(app.prescription || "");
    setMeetingNotes(app.meetingNotes || "");
  };

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    await completeAppointment(selectedApp._id, prescription, meetingNotes);
    setSelectedApp(null);
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-semibold text-gray-800">
        Patient Appointments Record
      </p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1.5fr_2fr] grid-flow-col py-3.5 px-6 border-b bg-gray-50 text-gray-600 font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions / Records</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_1.5fr_2fr] items-center text-gray-600 py-3.5 px-6 border-b hover:bg-gray-50 transition-colors"
            key={index}
          >
            <p className="max-sm:hidden font-medium">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover bg-indigo-50"
                src={item.userData.image}
                alt={item.userData.name}
              />
              <div>
                <p className="font-semibold text-gray-900">{item.userData.name}</p>
                <p className="text-xs text-gray-400">{item.userData.email}</p>
              </div>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p className="text-gray-700 font-medium">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p className="font-semibold text-green-600">₹{item.amount}</p>

            {item.cancelled ? (
              <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100 w-fit">
                Cancelled
              </span>
            ) : item.isCompleted ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Completed
                </span>
                <button
                  onClick={() => openCompleteModal(item)}
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  Edit Record
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openCompleteModal(item)}
                  className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold shadow hover:bg-primary-dark transition-all"
                >
                  Complete & Send Record
                </button>
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg text-xs font-semibold"
                  title="Cancel Appointment"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="text-center py-12 text-gray-400 font-medium">
            No patient appointments found.
          </p>
        )}
      </div>

      {/* Patient Record / Prescription Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Consultation Record for {selectedApp.userData.name}
                </h2>
                <p className="text-xs text-gray-500">
                  Slot: {slotDateFormat(selectedApp.slotDate)} at {selectedApp.slotTime}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} className="space-y-4 text-xs text-gray-700">
              <div>
                <label className="font-semibold text-gray-800 text-sm">
                  Meeting Notes / Diagnosis
                </label>
                <textarea
                  rows={3}
                  required
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  placeholder="e.g. Patient presented with fever. Advised 3 days rest and hydration."
                  className="w-full border border-gray-300 rounded-xl p-3 mt-1 outline-none focus:ring-1 focus:ring-primary text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-800 text-sm">
                  Prescription / Medications
                </label>
                <textarea
                  rows={4}
                  required
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  placeholder="e.g. Paracetamol 500mg - 1 tablet twice a day after meals for 3 days."
                  className="w-full border border-gray-300 rounded-xl p-3 mt-1 outline-none focus:ring-1 focus:ring-primary text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 font-semibold"
                >
                  Save & Send Record to Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
