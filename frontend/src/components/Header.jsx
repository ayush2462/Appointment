import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  Calendar,
  ShieldCheck,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  PhoneCall,
} from "lucide-react";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary via-indigo-600 to-blue-700 rounded-3xl px-6 sm:px-10 lg:px-16 py-10 md:py-16 my-4 shadow-xl overflow-hidden text-white font-sans">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -ml-20 -mb-20 w-60 h-60 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Left Content Side */}
        <div className="md:w-1/2 flex flex-col items-start gap-5 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>India's Trusted Healthcare & Doctor Portal</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Book Appointments With <span className="text-amber-300">Trusted Doctors</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-lg">
            Simply browse through our extensive directory of verified specialists, check real-time slot availability, and book your consultation hassle-free.
          </p>

          {/* Ratings & Patients Count */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 my-1">
            <img
              className="w-24 sm:w-28 shrink-0"
              src={assets.group_profiles}
              alt="Patient Reviews"
            />
            <div className="text-xs">
              <div className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span className="ml-1 text-white">4.9 / 5.0</span>
              </div>
              <p className="text-indigo-100 text-[11px] mt-0.5 font-medium">
                Over 50,000+ satisfied patient bookings
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#speciality"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-amber-300 hover:text-gray-950 font-bold px-7 py-3.5 rounded-full text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:108"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-full text-xs border border-white/30 backdrop-blur-md transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>Emergency 108</span>
            </a>
          </div>
        </div>

        {/* Right Doctor Image Side */}
        <div className="md:w-1/2 flex items-end justify-center relative">
          <div className="relative w-full max-w-md">
            <img
              className="w-full h-auto object-cover rounded-2xl drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              src={assets.header_img}
              alt="Top Healthcare Doctor"
            />

            {/* Floating Glassmorphism Badge 1 */}
            <div className="absolute top-6 left-2 sm:-left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg text-gray-800 hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">100% Verified</p>
                <p className="text-[10px] text-gray-500">NABH & ABDM Doctors</p>
              </div>
            </div>

            {/* Floating Glassmorphism Badge 2 */}
            <div className="absolute bottom-6 right-2 sm:-right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg text-gray-800 hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Instant Slots</p>
                <p className="text-[10px] text-gray-500">Same-day availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
