import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/relatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
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

  useEffect(() => {
    if (docSlots.length) {
      console.log(JSON.stringify(docSlots));
    }
  }, [docSlots]);

  return (
    docInfo && (
      <div className="max-w-5xl mx-auto p-6">
        {/* Doctor Details */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          {/* Doctor Image */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-primary p-4 rounded-lg shadow-lg">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Doctor Info */}
          <div className="border border-gray-200 flex-1 rounded-lg p-6 bg-white shadow-md">
            <p className="text-3xl font-semibold text-gray-900 flex items-center gap-2 mb-3">
              {docInfo.name}{" "}
              <img
                src={assets.verified_icon}
                alt="verified"
                className="w-6 h-6"
              />
            </p>

            <div className="flex items-center gap-4 text-lg text-gray-700 mb-4">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="bg-blue-100 text-blue-600 py-1 px-3 rounded-md text-sm font-medium">
                {docInfo.experience} years experience
              </button>
            </div>

            {/* About Doctor */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
                About{" "}
                <img
                  src={assets.info_icon}
                  alt="info"
                  className="w-5 h-5"
                />
              </p>
              <p className="text-gray-600">{docInfo.about}</p>
            </div>

            <p className="text-xl">
              Appointment fee:{" "}
              <span className="text-green-600 font-bold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-6 font-medium text-gray-700">
          <p className="text-xl mb-4">Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, i) => (
                <div
                  onClick={() => setSlotIndex(i)}
                  className={`text-center py-3 px-4 min-w-16 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    slotIndex === i
                      ? "bg-primary text-white"
                      : "border border-gray-200 text-gray-700"
                  }`}
                  key={i}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, i) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-medium px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-500 border border-gray-300"
                  }`}
                  key={i}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-4">
            Book an Appointment
          </button>
        </div>
        {/* Listing Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
  