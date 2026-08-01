import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          dob: userData.dob,
          gender: userData.gender,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || "Profile Updated Successfully");
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center space-y-4">
        <p className="text-xl font-bold text-gray-800">Account Access Required</p>
        <p className="text-sm text-gray-500">
          Please log in to view and manage your profile details.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-8 py-2.5 rounded-full font-medium shadow hover:bg-primary-dark transition-all text-sm"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    userData && (
      <div className="max-w-3xl mx-auto my-10 p-6 sm:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl space-y-8">
        {/* Header Avatar & Name */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-100">
          <div className="relative group">
            <img
              src={userData.image || assets.profile_pic}
              alt={userData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = assets.profile_pic;
              }}
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            {isEdit ? (
              <input
                type="text"
                className="text-2xl font-bold text-gray-900 border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                value={userData.name || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your Full Name"
              />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{userData.name}</p>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-gray-500">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                Patient Account
              </span>
              <span className="text-gray-400">• {userData.email}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <p className="text-base font-semibold text-gray-800 uppercase tracking-wide text-xs">
            Contact Information
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <p className="text-xs text-gray-400 font-medium">Email Address</p>
              <p className="font-semibold text-gray-800 truncate">{userData.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <p className="text-xs text-gray-400 font-medium">Phone Number</p>
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  value={userData.phone || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+1 234 567 890"
                />
              ) : (
                <p className="font-semibold text-gray-800">
                  {userData.phone || "Not Provided"}
                </p>
              )}
            </div>

            <div className="sm:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
              <p className="text-xs text-gray-400 font-medium">Address</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary font-medium text-sm"
                    value={userData.address?.line1 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary font-medium text-sm"
                    value={userData.address?.line2 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    placeholder="Address Line 2"
                  />
                </div>
              ) : (
                <p className="font-medium text-gray-700 leading-relaxed">
                  {userData.address?.line1 || "Line 1 Not Set"} <br />
                  {userData.address?.line2 || "Line 2 Not Set"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <p className="text-base font-semibold text-gray-800 uppercase tracking-wide text-xs">
            Basic Information
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <p className="text-xs text-gray-400 font-medium">Gender</p>
              {isEdit ? (
                <select
                  className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary font-medium bg-white"
                  value={userData.gender || "Not Selected"}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Not Selected">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="font-semibold text-gray-800">
                  {userData.gender || "Not Selected"}
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-1">
              <p className="text-xs text-gray-400 font-medium">Date of Birth</p>
              {isEdit ? (
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary font-medium bg-white"
                  value={userData.dob || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="font-semibold text-gray-800">
                  {userData.dob || "Not Selected"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Edit / Save Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          {isEdit ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={updateUserProfileData}
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full font-medium text-sm shadow-md transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full font-medium text-sm shadow-md transition-all"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
