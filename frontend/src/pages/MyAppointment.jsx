import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Printer,
  MapPin,
  Stethoscope,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  User,
  Sparkles,
} from "lucide-react";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol, userData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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
    toast.info("Online payment mode active! You can pay via UPI / NetBanking or at clinic.");
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

  const handlePrintRecord = () => {
    window.print();
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
    const matchesSearch =
      item.docData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.docData.speciality.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === "upcoming") return !item.cancelled && !item.isCompleted;
    if (filterType === "completed") return item.isCompleted;
    if (filterType === "cancelled") return item.cancelled;
    return true;
  });

  if (!token) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm text-center space-y-4 font-sans">
        <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Login Required</h2>
        <p className="text-xs text-gray-500">
          Please log in to your patient account to access past medical prescriptions and upcoming appointments.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-8 py-2.5 rounded-full font-semibold shadow hover:bg-primary-dark transition-all text-xs"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6 font-sans">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Patient Medical Records & Appointments
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Access past consultation prescriptions, view upcoming appointments, and manage healthcare records.
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
          <div className="bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-full border border-indigo-100 shadow-xs">
            Total Records: {appointments.length}
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full border border-emerald-100 shadow-xs">
            Upcoming: {activeCount}
          </div>
          {completedCount > 0 && (
            <div className="bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full border border-blue-100 shadow-xs">
              Completed: {completedCount}
            </div>
          )}
          {cancelledCount > 0 && (
            <div className="bg-rose-50 text-rose-700 px-3.5 py-1.5 rounded-full border border-rose-100 shadow-xs">
              Cancelled: {cancelledCount}
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              filterType === "all"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All ({appointments.length})
          </button>
          <button
            onClick={() => setFilterType("upcoming")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              filterType === "upcoming"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming ({activeCount})
          </button>
          <button
            onClick={() => setFilterType("completed")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              filterType === "completed"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setFilterType("cancelled")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              filterType === "cancelled"
                ? "bg-white text-primary shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor or speciality..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>
      </div>

      {/* Appointment & Medical Record List */}
      <div className="space-y-4">
        {filteredAppointments.map((item, i) => {
          const isCompleted = item.isCompleted;
          const isCancelled = item.cancelled;
          const isUpcoming = !isCompleted && !isCancelled;

          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-6 items-center justify-between"
            >
              {/* Doctor Profile & Status */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left flex-1">
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top bg-indigo-50 border border-indigo-100 shrink-0"
                  src={item.docData.image}
                  alt={item.docData.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                  }}
                />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {item.docData.name}
                    </h3>

                    {isCompleted && (
                      <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-600" /> Completed Record
                      </span>
                    )}

                    {isUpcoming && (
                      <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" /> Scheduled Visit
                      </span>
                    )}

                    {isCancelled && (
                      <span className="bg-rose-50 text-rose-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-rose-500" /> Cancelled
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-primary font-semibold">
                    {item.docData.speciality} • Fee: <span className="font-extrabold">{currencySymbol}{item.amount}</span>
                  </p>

                  <p className="text-xs text-gray-500 flex items-start gap-1 justify-center sm:justify-start mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span>
                      {item.docData.address?.line1}, {item.docData.address?.line2}
                    </span>
                  </p>

                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-3 text-xs">
                    <div className="bg-indigo-50/70 px-3 py-1 rounded-lg border border-indigo-100 flex items-center gap-1.5 font-bold text-primary">
                      <Calendar className="w-3.5 h-3.5" />
                      {slotDateFormat(item.slotDate)}
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-lg font-bold text-gray-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      {item.slotTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Container */}
              <div className="flex flex-col gap-2.5 w-full sm:w-48 shrink-0">
                {isCompleted && (
                  <button
                    onClick={() => setSelectedRecord(item)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Prescription
                  </button>
                )}

                {isUpcoming && (
                  <>
                    <button
                      onClick={handlePayOnline}
                      className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Pay ({currencySymbol}{item.amount})
                    </button>

                    <a
                      href={generateGoogleCalendarUrl(
                        item.docData.name,
                        item.slotDate,
                        item.slotTime
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium text-center transition flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" /> Add to Calendar
                    </a>

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-full py-2 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-medium transition"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}

                {isCancelled && (
                  <div className="w-full py-2.5 bg-rose-50/70 border border-rose-200/80 text-rose-600 rounded-xl text-xs font-semibold text-center">
                    Slot Released
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredAppointments.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-300 text-center my-6 space-y-3">
            <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No records found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You have no past prescriptions or upcoming appointments matching this category.
            </p>
            <button
              onClick={() => navigate("/doctors")}
              className="mt-2 bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow hover:bg-primary-dark transition-all"
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>

      {/* PRINTABLE DIGITAL PRESCRIPTION MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl border border-gray-100 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Header / Hospital Seal */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl">
                  Rx
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                    Prescripto Medical Prescription
                  </h2>
                  <p className="text-xs text-gray-500">
                    Official Digital Healthcare Summary Record
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintRecord}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                  title="Print Prescription"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100 font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Doctor & Patient Info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-0.5">
                  Attending Doctor
                </span>
                <p className="font-bold text-gray-900 text-sm">Dr. {selectedRecord.docData.name}</p>
                <p className="text-primary font-semibold">{selectedRecord.docData.speciality}</p>
                <p className="text-gray-500 mt-1">{selectedRecord.docData.degree}</p>
              </div>

              <div className="border-l border-gray-200 pl-4">
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-0.5">
                  Consultation Info
                </span>
                <p className="font-bold text-gray-900 text-sm">
                  {slotDateFormat(selectedRecord.slotDate)}
                </p>
                <p className="text-gray-600 font-semibold">{selectedRecord.slotTime}</p>
                <p className="text-emerald-700 font-bold mt-1">
                  Fee Paid: {currencySymbol}{selectedRecord.amount}
                </p>
              </div>
            </div>

            {/* Clinical Diagnosis & Notes */}
            <div className="space-y-4 text-xs">
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 space-y-1">
                <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                  <Stethoscope className="w-4 h-4" /> Diagnosis & Clinical Notes:
                </div>
                <p className="text-gray-800 leading-relaxed font-medium pt-1">
                  {selectedRecord.meetingNotes || "Patient consultation completed cleanly. Vitals stable."}
                </p>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Prescribed Medications & Instructions:
                </div>
                <p className="text-emerald-950 leading-relaxed font-medium pt-1 whitespace-pre-wrap">
                  {selectedRecord.prescription || "No special Rx prescribed. Follow-up as needed."}
                </p>
              </div>
            </div>

            {/* Footer Seal */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Authenticated by Prescripto Healthcare
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-xs text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
