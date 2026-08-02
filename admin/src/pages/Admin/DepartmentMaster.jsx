import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Eye,
  Baby,
  Activity,
  Microscope,
  Syringe,
  Pill,
  Sparkles,
  Plus,
  Search,
  Edit2,
  Trash2,
  Users,
  CheckCircle2,
  XCircle,
  Building2,
  X,
  RefreshCw,
} from "lucide-react";

// Icon mapping dictionary
const ICON_MAP = {
  Stethoscope,
  HeartPulse,
  Brain,
  Eye,
  Baby,
  Activity,
  Microscope,
  Syringe,
  Pill,
  Sparkles,
  Building2,
};

const ICON_OPTIONS = [
  { name: "Stethoscope", label: "General Medicine", icon: Stethoscope },
  { name: "HeartPulse", label: "Cardiology", icon: HeartPulse },
  { name: "Brain", label: "Neurology", icon: Brain },
  { name: "Eye", label: "Ophthalmology", icon: Eye },
  { name: "Baby", label: "Pediatrics / Gynecology", icon: Baby },
  { name: "Activity", label: "Diagnostics", icon: Activity },
  { name: "Microscope", label: "Pathology / Lab", icon: Microscope },
  { name: "Syringe", label: "Anesthesiology / Vaccines", icon: Syringe },
  { name: "Pill", label: "Pharmacy / Clinical", icon: Pill },
  { name: "Sparkles", label: "Dermatology / Cosmetic", icon: Sparkles },
];

const DepartmentMaster = () => {
  const {
    departments,
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    aToken,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Stethoscope");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (aToken) {
      getDepartments();
    }
  }, [aToken]);

  const openAddModal = () => {
    setEditingDept(null);
    setName("");
    setDescription("");
    setIcon("Stethoscope");
    setStatus(true);
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setName(dept.name || "");
    setDescription(dept.description || "");
    setIcon(dept.icon || "Stethoscope");
    setStatus(dept.status !== undefined ? dept.status : true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDept(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    let success = false;

    if (editingDept) {
      success = await updateDepartment(editingDept._id, {
        name,
        description,
        icon,
        status,
      });
    } else {
      success = await addDepartment({
        name,
        description,
        icon,
        status,
      });
    }

    setLoading(false);
    if (success) {
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const success = await deleteDepartment(id);
    setLoading(false);
    if (success) {
      setDeleteConfirmId(null);
    }
  };

  const toggleStatus = async (dept) => {
    await updateDepartment(dept._id, {
      name: dept.name,
      description: dept.description,
      icon: dept.icon,
      status: !dept.status,
    });
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dept.description &&
        dept.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalDoctors = departments.reduce(
    (acc, curr) => acc + (curr.doctorCount || 0),
    0
  );
  const activeDepartmentsCount = departments.filter((d) => d.status !== false).length;

  const renderIcon = (iconName, className = "w-6 h-6") => {
    const IconComp = ICON_MAP[iconName] || Stethoscope;
    return <IconComp className={className} />;
  };

  return (
    <div className="m-5 w-full max-w-7xl font-sans">
      {/* Header & Stats Banner */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-primary" />
            Department Master
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure hospital departments, medical specialities, and care units.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={getDepartments}
            className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition shadow-sm"
            title="Refresh List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Department
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Departments
            </p>
            <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Active Specialities
            </p>
            <p className="text-2xl font-bold text-gray-800">{activeDepartmentsCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Associated Doctors
            </p>
            <p className="text-2xl font-bold text-gray-800">{totalDoctors}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search department name or description..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>
        <p className="text-xs text-gray-500 hidden sm:block">
          Showing <span className="font-semibold text-gray-800">{filteredDepartments.length}</span> departments
        </p>
      </div>

      {/* Departments Grid */}
      {filteredDepartments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center my-6">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No departments found</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
            {searchQuery
              ? `No department matching "${searchQuery}". Try a different search.`
              : "Get started by adding your first department to manage medical specialities."}
          </p>
          {!searchQuery && (
            <button
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow"
            >
              <Plus className="w-4 h-4" /> Add First Department
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDepartments.map((dept) => {
            const isActive = dept.status !== false;
            return (
              <div
                key={dept._id}
                className="bg-white rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl transition-colors ${
                          isActive
                            ? "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {renderIcon(dept.icon, "w-6 h-6")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-base leading-snug">
                          {dept.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Inactive
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Count Badge */}
                    <div
                      className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200/60"
                      title="Assigned doctors"
                    >
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold text-gray-700">{dept.doctorCount || 0}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed min-h-[36px] line-clamp-2">
                    {dept.description || "No description provided."}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="px-5 py-3 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleStatus(dept)}
                    className={`font-medium transition ${
                      isActive
                        ? "text-gray-500 hover:text-amber-600"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    {isActive ? "Deactivate" : "Activate"}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(dept)}
                      className="p-1.5 text-gray-500 hover:text-primary hover:bg-white rounded-md border border-transparent hover:border-gray-200 transition shadow-none hover:shadow-sm"
                      title="Edit Department"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(dept._id)}
                      className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-white rounded-md border border-transparent hover:border-gray-200 transition shadow-none hover:shadow-sm"
                      title="Delete Department"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {editingDept ? "Edit Department" : "Add New Department"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                  Department Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cardiology, Neurology, Pediatrics"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                  Choose Department Icon
                </label>
                <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1.5 border border-gray-200 rounded-lg bg-gray-50/50">
                  {ICON_OPTIONS.map((opt) => {
                    const IconComponent = opt.icon;
                    const isSelected = icon === opt.name;
                    return (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setIcon(opt.name)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                        }`}
                        title={opt.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of department services, specialties, or facilities..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-800">Status</p>
                  <p className="text-xs text-gray-500">Enable or disable department for doctor assignment</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-emerald-500 transition-colors"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-md transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingDept ? "Update Department" : "Create Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 border border-gray-100 text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Delete Department?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Are you sure you want to remove this department? Doctors assigned to this department won't be deleted, but the category association may be affected.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition shadow-sm"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentMaster;
