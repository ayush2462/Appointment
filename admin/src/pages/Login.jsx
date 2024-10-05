import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);

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
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-[#dadada] rounded-xl shadow-lg bg-white text-[#5e5e5e] text-sm">
        <h2 className="text-2xl font-semibold text-center">
          <span className="text-primary">{state} </span>Login
        </h2>
        <div className="w-full">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            className="border border-[#dadada] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            className="border border-[#dadada] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            required
          />
        </div>
        <button className="mt-4 w-full bg-primary text-white rounded p-2 hover:bg-opacity-90 transition duration-200">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login{" "}
            <span
              className="text-primary underline cursor-pointer"
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
