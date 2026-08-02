import { useContext } from "react";
import { Link } from "react-router-dom";
import { assets, specialityData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { Sparkles, ChevronRight } from "lucide-react";

const SpecialityMenu = () => {
  const { departments = [], doctors = [] } = useContext(AppContext);

  const safeDepartments = Array.isArray(departments) ? departments : [];
  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  const safeSpecialityData = Array.isArray(specialityData) ? specialityData : [];

  const activeDepartments =
    safeDepartments.length > 0
      ? safeDepartments
          .filter((d) => d && d.status !== false && d.name)
          .map((d) => {
            const deptName = String(d.name || "").trim();
            const assetMatch = safeSpecialityData.find(
              (s) => s && s.speciality && String(s.speciality).toLowerCase() === deptName.toLowerCase()
            );
            const doctorCount = safeDoctors.filter(
              (doc) =>
                doc &&
                doc.speciality &&
                String(doc.speciality).toLowerCase() === deptName.toLowerCase()
            ).length;

            return {
              speciality: deptName,
              image: assetMatch ? assetMatch.image : (safeSpecialityData[0]?.image || assets.logo),
              doctorCount,
            };
          })
      : safeSpecialityData.map((s) => ({
          speciality: s?.speciality || "General",
          image: s?.image || assets.logo,
          doctorCount: safeDoctors.filter(
            (doc) => doc && doc.speciality && String(doc.speciality).toLowerCase() === String(s?.speciality || "").toLowerCase()
          ).length,
        }));

  return (
    <section
      className="py-14 px-4 max-w-7xl mx-auto font-sans"
      id="speciality"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
          <Sparkles className="w-3.5 h-3.5" /> Specialized Healthcare
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Hospital Departments
        </h2>
        <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto">
          Browse through our specialized medical departments and find verified doctors suited to your health needs.
        </p>
      </div>

      {/* Categories Horizontal Carousel / Grid */}
      <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 overflow-x-auto pb-4 pt-2">
        {activeDepartments.map((item, i) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            key={i}
            to={`/doctors/${encodeURIComponent(item.speciality)}`}
            className="group flex flex-col items-center bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex-shrink-0 w-44 sm:w-auto text-center cursor-pointer"
          >
            {/* Icon Circle Container */}
            <div className="w-20 h-20 bg-indigo-50/70 group-hover:bg-primary rounded-2xl flex items-center justify-center p-3 transition-colors duration-300 mb-3 shadow-inner">
              <img
                className="w-12 h-12 object-contain group-hover:brightness-200 transition-all duration-300 group-hover:scale-110"
                src={item.image}
                alt={item.speciality}
              />
            </div>

            <h3 className="font-bold text-gray-800 text-xs sm:text-sm leading-tight group-hover:text-primary transition-colors truncate w-full">
              {item.speciality}
            </h3>

            <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-gray-400 group-hover:text-primary transition-colors">
              <span>{item.doctorCount || 0} Doctors</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
