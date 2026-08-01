import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 md:px-10 py-8">
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
        Browse Through Our Specialists
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-8">
        <button
          className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : "bg-white text-gray-700"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Filter Options */}
        <div
          className={`flex-col space-y-3 text-sm text-gray-600 sm:flex ${
            showFilter ? "flex" : "hidden sm:flex"
          } min-w-56 bg-white p-4 rounded-xl border border-gray-100 shadow-sm`}
        >
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Gastroenterologist",
            "Neurologist",
          ].map((item, index) => (
            <p
              key={index}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all font-medium ${
                speciality === item
                  ? "bg-indigo-50 text-primary border-l-4 border-primary"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterDoc.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-indigo-100 bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="bg-indigo-50 overflow-hidden">
                <img
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
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
                    item.available !== false
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available !== false ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  <p>
                    {item.available !== false ? "Available" : "Not Available"}
                  </p>
                </div>

                <p className="text-lg font-bold text-gray-800 leading-tight">
                  {item.name}
                </p>
                <p className="text-gray-500 text-xs mt-1">{item.speciality}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {item.experience} Exp • ₹{item.fees} Fee
                </p>
              </div>
            </div>
          ))}

          {filterDoc.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400 font-medium">
              No doctors found for this speciality.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
