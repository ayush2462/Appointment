import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserPlus, ArrowRight, Sparkles } from "lucide-react";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-primary via-indigo-600 to-blue-700 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 my-16 max-w-7xl mx-auto shadow-xl overflow-hidden text-white font-sans">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 py-10 md:py-16">
        {/* Left Side */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/15 text-amber-300 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> Start Your Healthcare Journey Today
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Book Appointment <br />
            <span className="text-amber-300">with 100+ Trusted Doctors</span>
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100 max-w-md mx-auto md:mx-0">
            Create an account to book consultations, download digital prescriptions, and manage healthcare records for your whole family.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-amber-300 hover:text-gray-950 font-bold px-8 py-3.5 rounded-full text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:block md:w-1/2 lg:w-[380px] relative">
          <img
            className="w-full max-w-md object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
            src={assets.appointment_img}
            alt="Doctor Consultation"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
