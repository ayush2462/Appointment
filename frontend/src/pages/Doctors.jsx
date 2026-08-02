import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { doctors = [], currencySymbol = "₹", departments = [], getDepartmentsData } =
    useContext(AppContext);

  useEffect(() => {
    if (typeof getDepartmentsData === "function") {
      getDepartmentsData();
    }
  }, []);

  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  const safeDepartments = Array.isArray(departments) ? departments : [];

  // Use departments added by admin (filtered to active status),
  // falling back to unique specialities present among active doctors if no custom departments exist
  const activeSpecialities =
    safeDepartments.length > 0
      ? safeDepartments
          .filter((d) => d && d.status !== false && d.name)
          .map((d) => String(d.name).trim())
      : Array.from(
          new Set(
            safeDoctors
              .map((d) => d && d.speciality && String(d.speciality).trim())
              .filter(Boolean)
          )
        );

  const applyFilter = () => {
    let result = safeDoctors;
    if (speciality) {
      result = result.filter(
        (doc) => doc && doc.speciality && String(doc.speciality).toLowerCase() === String(speciality).toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (doc) =>
          doc &&
          ((doc.name && String(doc.name).toLowerCase().includes(q)) ||
            (doc.speciality && String(doc.speciality).toLowerCase().includes(q)))
      );
    }
    setFilterDoc(result);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery]);

  return (
    <div className="px-4 md:px-10 py-8 font-sans max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Browse Our Specialist Doctors
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          Find top-rated healthcare specialists, view availability, and schedule your appointment instantly.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name or department..."
            className="w-full px-4 py-3 pl-11 text-sm bg-white border border-gray-200 rounded-full shadow-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Mobile Filter Toggle */}
        <button
          className={`py-2 px-4 border rounded-xl text-sm font-medium transition-all lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 ${
            showFilter ? "bg-primary text-white" : "bg-white text-gray-700 shadow-xs"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <span>Department Filters</span>
          <span className="text-xs bg-indigo-100 text-primary px-2 py-0.5 rounded-full font-bold">
            {speciality || "All"}
          </span>
        </button>

        {/* Filter Options Sidebar (Dynamic Admin Departments) */}
        <div
          className={`flex-col space-y-2 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden lg:flex"
          } w-full lg:w-64 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs shrink-0`}
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
            Hospital Departments
          </p>

          <p
            className={`px-3.5 py-2.5 rounded-xl cursor-pointer transition-all font-medium text-xs flex items-center justify-between ${
              !speciality
                ? "bg-primary text-white font-semibold shadow-xs"
                : "hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => navigate("/doctors")}
          >
            <span>All Departments</span>
            <span className="text-[11px] opacity-80">({safeDoctors.length})</span>
          </p>

          {activeSpecialities.map((item, index) => {
            const count = safeDoctors.filter(
              (d) => d && d.speciality && String(d.speciality).toLowerCase() === String(item).toLowerCase()
            ).length;
            const isActive =
              speciality && String(speciality).toLowerCase() === String(item).toLowerCase();
            return (
              <p
                key={index}
                className={`px-3.5 py-2.5 rounded-xl cursor-pointer transition-all font-medium text-xs flex items-center justify-between ${
                  isActive
                    ? "bg-indigo-50 text-primary font-semibold border-l-4 border-primary"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() =>
                  isActive ? navigate("/doctors") : navigate(`/doctors/${encodeURIComponent(item)}`)
                }
              >
                <span className="truncate pr-2">{item}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </p>
            );
          })}
        </div>

        {/* Doctor Cards Grid */}
        <div className="w-full flex-1">
          {filterDoc.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center my-4">
              <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                👨‍⚕️
              </div>
              <h3 className="text-lg font-bold text-gray-800">No doctors available</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                No doctors matching your selected department or search term were found.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  navigate("/doctors");
                }}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-primary-dark transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterDoc.map((item, i) => {
                if (!item) return null;
                const isAvailable = item.available !== false;
                return (
                  <div
                    key={item._id || i}
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    className="border border-gray-200/80 bg-white rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Fixed Height Image Container */}
                    <div className="relative w-full h-60 bg-gradient-to-b from-indigo-50/80 to-blue-50/40 overflow-hidden flex items-end justify-center">
                      <img
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                        }}
                      />
                      {/* Availability Badge Overlay */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium shadow-xs flex items-center gap-1.5 border border-gray-100">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAvailable ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                          }`}
                        ></span>
                        <span
                          className={
                            isAvailable ? "text-emerald-700 font-semibold" : "text-gray-600"
                          }
                        >
                          {isAvailable ? "Available" : "Not Available"}
                        </span>
                      </div>

                      {/* Speciality Badge */}
                      <div className="absolute bottom-3 left-3 bg-primary text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-xs">
                        {item.speciality}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {item.degree} • {item.experience} Experience
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">
                            Consult Fee
                          </span>
                          <span className="text-primary font-bold text-sm">
                            {currencySymbol}
                            {item.fees}
                          </span>
                        </div>

                        <button className="px-3.5 py-2 bg-indigo-50 group-hover:bg-primary group-hover:text-white text-primary font-semibold rounded-xl transition-colors text-xs flex items-center gap-1">
                          Book Visit →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
