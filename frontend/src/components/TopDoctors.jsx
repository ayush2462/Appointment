import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-semibold text-gray-800">Top Doctors to Book</h1>
      <p className="sm:w-1/2 md:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors and request
        an appointment that works best for you.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, i) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-100 bg-white rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            key={i}
          >
            <div className="bg-indigo-50 overflow-hidden">
              <img
                className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                }}
              />
            </div>

            <div className="p-4 bg-white">
              <div
                className={`flex items-center gap-2 text-xs font-medium mb-1.5 ${
                  item.available !== false ? "text-green-600" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available !== false ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                <p>{item.available !== false ? "Available" : "Not Available"}</p>
              </div>

              <p className="text-gray-900 text-base font-semibold truncate">
                {item.name}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium px-12 py-3 rounded-full mt-10 transition-all border border-indigo-100 shadow-sm"
      >
        View More Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
