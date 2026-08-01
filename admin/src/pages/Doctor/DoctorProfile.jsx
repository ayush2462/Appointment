import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, backendUrl } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees || "");
      setAddress1(profileData.address?.line1 || "");
      setAddress2(profileData.address?.line2 || "");
      setAvailable(profileData.available !== false);
    }
  }, [profileData]);

  const updateProfile = async () => {
    try {
      const updateData = {
        fees: Number(fees),
        address: { line1: address1, line2: address2 },
        available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId: profileData._id },
        { headers: { dToken } }
      );

      toast.success("Profile status updated successfully");
      setIsEdit(false);
      getProfileData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    profileData && (
      <div className="m-5 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <img
              className="bg-indigo-50 w-36 h-36 rounded-2xl object-cover border-2 border-indigo-100"
              src={profileData.image}
              alt={profileData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://raw.githubusercontent.com/ayush2462/Appointment/main/frontend/src/assets/doc1.png";
              }}
            />
          </div>

          <div className="flex-1 space-y-4 text-sm text-gray-700">
            <div>
              <p className="text-3xl font-bold text-gray-900">{profileData.name}</p>
              <p className="text-indigo-600 font-semibold mt-1">
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100 mt-2">
                {profileData.experience} Experience
              </span>
            </div>

            <div>
              <p className="font-semibold text-gray-800 text-base">About</p>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">
                {profileData.about}
              </p>
            </div>

            <div className="pt-2">
              <p className="font-semibold text-gray-800">
                Consultation Fee:{" "}
                <span className="text-green-600 font-bold text-base">
                  ₹{profileData.fees}
                </span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-1">
              <p className="font-semibold text-gray-800">Clinic Address:</p>
              <p className="text-gray-500 text-xs">{profileData.address?.line1}</p>
              <p className="text-gray-500 text-xs">{profileData.address?.line2}</p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={available}
                onChange={() => setAvailable(!available)}
                className="w-4 h-4 text-primary rounded border-gray-300 accent-primary"
              />
              <span className="font-medium text-gray-700">Available for Appointments</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
