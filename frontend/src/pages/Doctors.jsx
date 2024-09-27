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
    <div className="px-6 py-10">
      <p className="text-3xl md:text-4xl font-semibold mb-10 text-center">
        Browse Through Our Specialists
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': ''}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        {/* Filter Options */}
        <div className="flex flex-col space-y-5 text-gray-700">
          <p
            className="cursor-pointer hover:text-blue-500 transition-all"
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
          >
            General Physician
          </p>
          <p
            className="cursor-pointer hover:text-blue-500 transition-all"
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
          >
            Gynecologist
          </p>
          <p
            className="cursor-pointer hover:text-blue-500 transition-all"
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
          >
            Dermatologist
          </p>
          <p
            className="cursor-pointer hover:text-blue-500 transition-all"
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
          >
            Pediatricians
          </p>
          <p
            className="cursor-pointer hover:text-blue-500 transition-all"
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
          >
            Gastroenterologist
          </p>
          <p
            className="cursor-pointer hover:text-blue-500 transition-all"
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
          >
            Neurologist
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="col-span-2 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterDoc.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              {/* Adjusting the banner image size */}
              <img
                className="w-full h-52 sm:h-60 md:h-64 lg:h-72 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-5 bg-white">
                <div className="flex items-center gap-2 text-sm text-center text-green-600 mb-3">
                  <p className="w-3 h-3 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                {/* Text Size Adjustments */}
                <p className="text-xl md:text-2xl font-bold text-gray-800">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
