import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <p className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        My Appointments
      </p>

      <div className="space-y-6">
        {doctors.slice(0, 5).map((item, i) => (
          <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-center"
            key={i}
          >
            {/* Doctor Image */}
            <div className="w-32 h-32 flex-shrink-0">
              <img
                className="w-full h-full object-cover rounded-lg shadow-lg bg-indigo-50"
                src={item.image}
                alt={`${item.name} profile`}
              />
            </div>

            {/* Appointment Details */}
            <div className="flex-1 text-sm text-gray-700 space-y-2">
              <p className="text-xl font-semibold text-gray-900">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>

              <div>
                <p className="text-gray-800 font-medium mt-4">Address:</p>
                <p className="text-gray-500">{item.address.line1}</p>
                <p className="text-gray-500">{item.address.line2}</p>
              </div>

              <div className="mt-4">
                <p className="text-gray-800 font-medium">Date & Time:</p>
                <p className="text-gray-600">25, July, 2024 | 8:30 PM</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 w-full sm:w-auto">
              <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all">
                Pay Online
              </button>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
