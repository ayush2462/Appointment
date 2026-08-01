import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/relatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlot = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(23, 59, 59);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTimeStr = formattedTime;

        const isBooked =
          docInfo?.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTimeStr);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warning("Please select a time slot for your appointment");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment request sent to doctor successfully!");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Doctor Details Card */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          {/* Doctor Image */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-indigo-50 p-4 rounded-2xl shadow-sm border border-indigo-100 flex items-center justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-auto rounded-xl object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
              }}
            />
          </div>

          {/* Doctor Info */}
          <div className="border border-gray-100 flex-1 rounded-2xl p-6 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {docInfo.name}{" "}
                <img
                  src={assets.verified_icon}
                  alt="verified"
                  className="w-6 h-6"
                />
              </p>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
                Verified Specialist
              </span>
            </div>

            <div className="flex items-center gap-3 text-base text-gray-700 flex-wrap">
              <p className="font-medium text-indigo-600">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="bg-indigo-50 text-indigo-700 py-1 px-3 rounded-full text-xs font-semibold border border-indigo-100">
                {docInfo.experience} years experience
              </button>
            </div>

            {/* About Doctor */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1.5">
                About Doctor{" "}
                <img
                  src={assets.info_icon}
                  alt="info"
                  className="w-4 h-4"
                />
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">{docInfo.about}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-medium text-gray-700">
                Consultation Fee:{" "}
                <span className="text-emerald-600 font-bold text-xl">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
              <p className="text-xs text-gray-400">Includes taxes & clinic charges</p>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm font-medium text-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-800">Select Date & Time</p>
            <p className="text-xs text-indigo-600 font-medium">Available for next 7 days</p>
          </div>

          {/* Days Carousel */}
          <div className="flex gap-3 items-center w-full overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, i) => (
                <div
                  onClick={() => {
                    setSlotIndex(i);
                    setSlotTime("");
                  }}
                  className={`text-center py-3.5 px-5 min-w-[70px] rounded-2xl cursor-pointer transition-all duration-200 ${
                    slotIndex === i
                      ? "bg-primary text-white shadow-md scale-105"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                  key={i}
                >
                  <p className="text-xs font-semibold uppercase">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg font-bold mt-0.5">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex items-center gap-3 w-full overflow-x-auto pt-2 pb-2">
            {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
              docSlots[slotIndex].map((item, i) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-xs font-semibold px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200 flex-shrink-0 ${
                    item.time === slotTime
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 border border-gray-200 hover:bg-indigo-50"
                  }`}
                  key={i}
                >
                  {item.time.toLowerCase()}
                </p>
              ))
            ) : (
              <p className="text-xs text-gray-400 py-2">No slots available for this date.</p>
            )}
          </div>

          {/* Selected Booking Summary */}
          {slotTime && docSlots[slotIndex]?.[0] && (
            <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-indigo-700 font-semibold uppercase">Appointment Summary</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">
                  {docSlots[slotIndex][0].datetime.getDate()}{" "}
                  {months[docSlots[slotIndex][0].datetime.getMonth() + 1]},{" "}
                  {docSlots[slotIndex][0].datetime.getFullYear()} at {slotTime}
                </p>
              </div>
              <p className="text-sm font-bold text-emerald-600">
                Fee: {currencySymbol}{docInfo.fees}
              </p>
            </div>
          )}

          {/* Book Action Button */}
          <button
            onClick={bookAppointment}
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-sm font-medium px-12 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 mt-2"
          >
            Book an Appointment
          </button>
        </div>

        {/* Listing Related Doctors */}
        <div className="mt-12">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;