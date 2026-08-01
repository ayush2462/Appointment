import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin Logged In");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor Logged In");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-[#dadada] rounded-xl shadow-lg bg-white text-[#5e5e5e] text-sm">
        <h2 className="text-2xl font-semibold text-center">
          <span className="text-primary">{state} </span>Login
        </h2>
        <div className="w-full">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            className="border border-[#dadada] rounded w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            required
            placeholder="e.g. doctor@example.com"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            className="border border-[#dadada] rounded w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>
        <button className="mt-2 w-full bg-primary text-white font-medium rounded p-2.5 hover:bg-primary-dark transition duration-200 shadow">
          Login
        </button>
        {state === "Admin" ? (
          <p className="text-xs text-gray-500">
            Doctor Login?{" "}
            <span
              className="text-primary font-semibold underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            Admin Login?{" "}
            <span
              className="text-primary font-semibold underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
