import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Ayush Vishwakarma",
    image: assets.profile_pic,
    email: "ayush@gmail.com",
    phone: "+1 23 65 58 9645",
    address: {
      line1: "nnnhhjjfhn",
      line2: "jjktkuy7kyukyk",
    },
    gender: "Male",
    dob: "2000-1-20",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
        {/* Profile Image */}
        <img
          src={userData.image}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />

        {/* Name Section */}
        <div className="flex-1 text-center md:text-left">
          {isEdit ? (
            <input
              type="text"
              className="text-xl font-semibold border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-3xl font-bold text-gray-800">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-200" />

      {/* Contact Information */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-800 mb-4">
          Contact Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1 text-center md:text-left">
          {isEdit ? (
            <input
              type="email"
              className="text-lg border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-lg font-md text-gray-800">{userData.email}</p>
          )}
        </div>
          <div>
            <p className="font-medium text-gray-700">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-600">{userData.phone}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-700">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <p className="text-gray-600">
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="my-8 border-t-2 border-gray-200" />

      {/* Basic Information */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-800 mb-4">
          Basic Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-700">Gender:</p>
            {isEdit ? (
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-700">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="flex justify-end">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
