import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability, deleteDoctor, editDoctor } =
    useContext(AdminContext);

  const [editingDoc, setEditingDoc] = useState(null);
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

  const handleDelete = async (docId, docName) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${docName}?`)) {
      await deleteDoctor(docId);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll w-full max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">All Doctors</h1>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
          Total: {doctors.length} Doctors
        </span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
        {doctors.map((item) => (
          <div
            className="border border-indigo-100 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            key={item._id}
          >
            <div className="relative overflow-hidden bg-indigo-50 group-hover:bg-primary transition-all duration-500">
              <img
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.image}
                alt={`Dr. ${item.name}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
                }}
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                <span
                  className={
                    item.available ? "text-green-700" : "text-gray-600"
                  }
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-gray-900 text-base font-semibold leading-tight">
                  {item.name}
                </p>
                <p className="text-indigo-600 text-xs font-medium mt-1">
                  {item.speciality}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {item.degree} • {item.experience} Exp
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-700 font-medium">
                  Fee: <span className="text-green-600 font-bold">₹{item.fees}</span>
                </span>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer accent-primary"
                  />
                  <span className="text-gray-700 font-medium">Available</span>
                </label>
              </div>

              {/* Action Buttons (Edit / Delete) */}
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="flex-1 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium transition-all text-center"
                >
                  Edit Doctor
                </button>
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          No doctors found. Add a doctor to get started.
        </p>
      )}

      {/* Edit Doctor Modal */}
      {editingDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-gray-900">
                Edit Dr. {editingDoc.name}
              </h2>
              <button
                onClick={() => setEditingDoc(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs text-gray-700">
              <div>
                <label className="font-semibold text-gray-700">Doctor Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700">Speciality</label>
                  <select
                    value={formData.speciality}
                    onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                    className="w-full border rounded-lg p-2 mt-1 outline-none bg-white"
                  >
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                    <option value="Neurologist">Neurologist</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Degree</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700">Experience</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Address Line 1</label>
                <input
                  type="text"
                  required
                  value={formData.line1}
                  onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                  className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Address Line 2</label>
                <input
                  type="text"
                  required
                  value={formData.line2}
                  onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                  className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">About</label>
                <textarea
                  rows={3}
                  required
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full border rounded-lg p-2 mt-1 outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;