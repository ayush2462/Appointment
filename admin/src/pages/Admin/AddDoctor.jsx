import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken, getAllDoctors } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please select a doctor image");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message || "Doctor Added Successfully");
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-5xl">
      <p className="mb-4 text-lg font-semibold text-gray-800">Add New Doctor</p>

      <div className="bg-white px-8 py-8 border rounded-xl shadow-sm w-full max-h-[85vh] overflow-y-scroll space-y-6">
        {/* Upload Image Section */}
        <div className="flex items-center gap-4 text-gray-600 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 bg-white rounded-full object-cover border-2 border-primary p-1 shadow-sm hover:scale-105 transition-all"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload Doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <div>
            <p className="font-medium text-gray-800 text-sm">Upload Doctor Picture</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP recommended</p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8 text-gray-700 text-sm">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="text"
                placeholder="Dr. John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="email"
                placeholder="doctor@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Doctor Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="password"
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm bg-white"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10+ Years</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Consultation Fees (₹)</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="number"
                placeholder="e.g. 50"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm bg-white"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-gray-700">Education / Degree</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="text"
                placeholder="MBBS, MD"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Clinic Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="text"
                placeholder="Address Line 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border border-gray-300 rounded-lg px-3.5 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-1.5">
          <label className="font-medium text-gray-700">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full border border-gray-300 rounded-lg p-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            placeholder="Write a brief overview of doctor's background and expertise..."
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-10 py-3.5 rounded-full font-medium shadow-md transition-all duration-200 hover:shadow-lg"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
