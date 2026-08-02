import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  Star,
  ArrowRight,
  UserCheck,
} from "lucide-react";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors = [], currencySymbol = "₹" } = useContext(AppContext);

  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  return (
    <section className="py-14 px-4 md:px-10 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <UserCheck className="w-3.5 h-3.5" /> Verified Medical Staff
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Top Rated Doctor Specialists
        </h2>
        <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto">
          Choose from highly qualified healthcare professionals, view availability, and schedule your appointment instantly.
        </p>
      </div>

      {/* Doctor Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-2">
        {safeDoctors.slice(0, 10).map((item, i) => {
          if (!item) return null;
          const isAvailable = item.available !== false;
          return (
            <div
              key={item._id || i}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-gray-200/90 bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container with Fixed Ratio & Top Fit */}
              <div className="relative w-full h-52 bg-gradient-to-b from-indigo-50/80 to-blue-50/40 overflow-hidden flex items-end justify-center">
                <img
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                  alt={item.name || "Doctor"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                  }}
                />

                {/* Availability Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1.5 border border-gray-100">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                    }`}
                  ></span>
                  <span className={isAvailable ? "text-emerald-700" : "text-gray-600"}>
                    {isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Speciality Badge */}
                <div className="absolute bottom-3 left-3 bg-primary text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm">
                  {item.speciality || "General Physician"}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9</span>
                    <span className="text-gray-400 font-normal text-[10px] ml-1">(120+ reviews)</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors truncate">
                    {item.name || "Doctor"}
                  </h3>

                  <p className="text-xs text-gray-500 font-medium mt-1 truncate">
                    {item.degree || "MBBS"} • {item.experience || "5+ Years"} Exp
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">
                      Consult Fee
                    </span>
                    <span className="text-primary font-bold text-sm">
                      {currencySymbol}
                      {item.fees || 500}
                    </span>
                  </div>

                  <button className="px-3 py-1.5 bg-indigo-50 group-hover:bg-primary group-hover:text-white text-primary font-semibold rounded-xl transition-all text-xs flex items-center gap-1 shadow-sm">
                    Book <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More Doctors CTA */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
            navigate("/doctors");
            window.scrollTo(0, 0);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white font-bold px-10 py-3.5 rounded-full text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <span>View All Doctors ({safeDoctors.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;
