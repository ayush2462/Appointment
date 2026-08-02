import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  Search,
  Filter,
  UserCheck,
  Edit2,
  Trash2,
  Stethoscope,
  GraduationCap,
  Briefcase,
  DollarSign,
  MapPin,
  X,
  Building2,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const {
    doctors,
    getAllDoctors,
    aToken,
    changeAvailability,
    deleteDoctor,
    editDoctor,
    departments,
    getDepartments,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [editingDoc, setEditingDoc] = useState(null);
  const [deleteConfirmDoc, setDeleteConfirmDoc] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    speciality: "General Physician",
    degree: "",
    experience: "1 Year",
    fees: "",
    about: "",
    line1: "",
    line2: "",
  });

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      if (getDepartments) getDepartments();
    }
  }, [aToken]);

  const handleEditClick = (doc) => {
    setEditingDoc(doc);
    setFormData({
      name: doc.name || "",
      speciality: doc.speciality || "General Physician",
      degree: doc.degree || "",
      experience: doc.experience || "1 Year",
      fees: doc.fees || "",
      about: doc.about || "",
      line1: doc.address?.line1 || "",
      line2: doc.address?.line2 || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingDoc) return;

    await editDoctor(editingDoc._id, {
      name: formData.name,
      speciality: formData.speciality,
      degree: formData.degree,
      experience: formData.experience,
      fees: Number(formData.fees),
      about: formData.about,
      address: { line1: formData.line1, line2: formData.line2 },
    });

    setEditingDoc(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmDoc) {
      await deleteDoctor(deleteConfirmDoc._id);
      setDeleteConfirmDoc(null);
    }
  };

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.degree && doc.degree.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpeciality =
      selectedSpeciality === "All" || doc.speciality === selectedSpeciality;

    const matchesAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Available" && doc.available !== false) ||
      (availabilityFilter === "Unavailable" && doc.available === false);

    return matchesSearch && matchesSpeciality && matchesAvailability;
  });

  // Extract unique specialities list
  const specialitiesList = Array.from(
    new Set([
      ...doctors.map((d) => d.speciality).filter(Boolean),
      ...(departments ? departments.map((d) => d.name) : []),
    ])
  );

  return (
    <div className="m-5 w-full max-w-7xl font-sans">
      {/* Header & Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2.5">
            <UserCheck className="w-7 h-7 text-primary" />
            Doctor Directory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage medical staff profiles, availability, and consultation details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-indigo-50 text-primary px-3.5 py-2 rounded-xl border border-indigo-100/80 shadow-xs">
            Total Doctors: {doctors.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, speciality, or degree..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Speciality Filter */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-600">Speciality:</span>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="bg-transparent outline-none font-semibold text-gray-800 cursor-pointer"
            >
              <option value="All">All Specialities</option>
              {specialitiesList.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
            <span className="font-medium text-gray-600">Status:</span>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="bg-transparent outline-none font-semibold text-gray-800 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center my-6">
          <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No doctors match your criteria</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
            Try adjusting your search query or filters to find doctors in the directory.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((item) => {
            const isAvailable = item.available !== false;
            return (
              <div
                key={item._id}
                className="border border-gray-200/90 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Fixed Ratio & Top Fitting */}
                <div className="relative w-full h-56 bg-gradient-to-b from-indigo-50/70 to-blue-50/40 overflow-hidden flex items-end justify-center">
                  <img
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={`Dr. ${item.name}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                    }}
                  />
                  {/* Availability Badge Overlay */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium shadow-sm flex items-center gap-1.5 border border-gray-100">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isAvailable ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                      }`}
                    ></span>
                    <span className={isAvailable ? "text-emerald-700" : "text-gray-600"}>
                      {isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {/* Speciality Badge Pill */}
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm">
                    {item.speciality}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-gray-900 text-base font-bold leading-tight line-clamp-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                        <GraduationCap className="w-3.5 h-3.5 text-primary" />
                        {item.degree}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-700">
                        <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                        {item.experience}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.about || "Experienced specialist dedicated to comprehensive patient care."}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    {/* Fee & Availability Switch */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <div>
                        <span className="text-gray-400 block text-[10px] font-semibold uppercase">
                          Consult Fee
                        </span>
                        <span className="text-primary font-bold text-sm">₹{item.fees}</span>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer select-none bg-gray-50 hover:bg-gray-100/90 px-3 py-1.5 rounded-xl border border-gray-200/80 transition-all">
                        <div className="relative inline-flex items-center">
                          <input
                            onChange={() => changeAvailability(item._id)}
                            type="checkbox"
                            checked={isAvailable}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-emerald-500 transition-colors"></div>
                        </div>
                        <span className={`text-xs font-semibold ${isAvailable ? "text-emerald-700 font-bold" : "text-gray-500"}`}>
                          {isAvailable ? "Active" : "Off"}
                        </span>
                      </label>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                      </button>
                      <button
                        onClick={() => setDeleteConfirmDoc(item)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold transition"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT DOCTOR MODAL */}
      {editingDoc && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-primary" />
                Edit Dr. {editingDoc.name}
              </h2>
              <button
                onClick={() => setEditingDoc(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-xs text-gray-700">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Doctor Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Speciality</label>
                  <select
                    value={formData.speciality}
                    onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                    className="w-full border rounded-lg p-2.5 outline-none bg-white text-sm"
                  >
                    {specialitiesList.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Degree</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Experience</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Address Line 1</label>
                <input
                  type="text"
                  required
                  value={formData.line1}
                  onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Address Line 2</label>
                <input
                  type="text"
                  required
                  value={formData.line2}
                  onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">About Doctor</label>
                <textarea
                  rows={3}
                  required
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full border rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmDoc && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              Delete Dr. {deleteConfirmDoc.name}?
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              This action cannot be undone. All slot records for this doctor will be removed.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition shadow-sm"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;