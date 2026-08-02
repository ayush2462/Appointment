import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  HeartPulse,
  ChevronRight,
  Sparkles,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 font-sans pt-14 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                ABDM & NABH Compliant
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Ayushman Bharat Digital Verified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                24x7 India Helpline
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                Toll-Free: 1800-123-4567
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-6 h-6 text-rose-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Emergency Ambulance
              </p>
              <p className="text-[11px] text-rose-400 font-bold mt-0.5">
                Dial 108 (India Emergency)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Top Rated Specialist Care
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                100% Verified Medical Doctors
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800 text-xs">
          {/* Column 1: Company Profile & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img className="w-36 bg-white/90 p-2 rounded-xl shadow-sm" src={assets.logo} alt="Prescripto Healthcare" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                🇮🇳 India
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
              Prescripto Healthcare India Pvt. Ltd. is India's leading digital doctor appointment platform connecting patients with top hospital specialists, verified clinics, and digital medical records.
            </p>

            <div className="space-y-2.5 pt-2 text-gray-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Prescripto Medical Tower, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051, India
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Appointments: +91 1800-123-4567 / +91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>Email: support@prescripto.in | care@prescripto.in</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon - Sat: 8:00 AM - 9:00 PM IST (Sun: 9:00 AM - 4:00 PM IST)</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-primary" /> Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-primary transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-primary" /> Find Doctor Specialists
                </Link>
              </li>
              <li>
                <Link to="/my-appointments" className="hover:text-primary transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-primary" /> My Patient Records
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-primary" /> About Prescripto
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-primary" /> Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Specialities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Top Specialities
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/doctors/General Physician" className="hover:text-primary transition">
                  General Physician
                </Link>
              </li>
              <li>
                <Link to="/doctors/Gynecologist" className="hover:text-primary transition">
                  Gynecology & Obstetrics
                </Link>
              </li>
              <li>
                <Link to="/doctors/Dermatologist" className="hover:text-primary transition">
                  Dermatology & Skin Care
                </Link>
              </li>
              <li>
                <Link to="/doctors/Pediatricians" className="hover:text-primary transition">
                  Pediatrics & Child Care
                </Link>
              </li>
              <li>
                <Link to="/doctors/Gastroenterologist" className="hover:text-primary transition">
                  Gastroenterology
                </Link>
              </li>
              <li>
                <Link to="/doctors/Neurologist" className="hover:text-primary transition">
                  Neurology & Brain Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Top Indian Cities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Major Cities Care
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-primary cursor-pointer transition">Doctors in Mumbai</li>
              <li className="hover:text-primary cursor-pointer transition">Doctors in Delhi NCR</li>
              <li className="hover:text-primary cursor-pointer transition">Doctors in Bengaluru</li>
              <li className="hover:text-primary cursor-pointer transition">Doctors in Hyderabad</li>
              <li className="hover:text-primary cursor-pointer transition">Doctors in Chennai</li>
              <li className="hover:text-primary cursor-pointer transition">Doctors in Kolkata / Pune</li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Prescripto Healthcare India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="hover:text-primary cursor-pointer transition">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer transition">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer transition">NABH Policy</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> INR (₹) Currency
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
