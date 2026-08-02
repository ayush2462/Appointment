import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Stethoscope,
  Building2,
  FileCheck2,
  Lock,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Verified Specialist Doctors", value: "100+" },
    { label: "Successful Patient Consultations", value: "50,000+" },
    { label: "Top Indian Cities Covered", value: "25+" },
    { label: "Patient Satisfaction Score", value: "4.9 ★" },
  ];

  const corePillars = [
    {
      icon: Clock,
      title: "Zero Queue Waiting",
      desc: "Instantly reserve doctor slots online without waiting in long clinic queues.",
      color: "bg-blue-50 text-primary border-blue-100",
    },
    {
      icon: FileCheck2,
      title: "Digital Prescription Records",
      desc: "Access your diagnosis, doctor notes, and Rx prescriptions securely on your mobile.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: ShieldCheck,
      title: "ABDM & NABH Verified",
      desc: "Every doctor listed is 100% verified under Ayushman Bharat Digital Mission guidelines.",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      icon: HeartPulse,
      title: "24x7 India Emergency Line",
      desc: "Direct integration with 108 Emergency Ambulance and helpline support.",
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 font-sans space-y-16">
      {/* Hero Header Banner */}
      <div className="relative bg-gradient-to-r from-primary via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-14 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Transforming Healthcare Access Across India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Redefining Patient Care & <br />
            <span className="text-amber-300">Specialist Doctor Access</span>
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-2xl">
            Prescripto Healthcare is India's leading digital health ecosystem connecting patients with top hospital consultants, streamlining instant appointment scheduling, and preserving digital health records.
          </p>
        </div>

        {/* Stats Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/20 relative z-10">
          {stats.map((st, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">{st.value}</p>
              <p className="text-[11px] sm:text-xs text-indigo-100 font-medium mt-1">{st.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Story & Vision Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image with Badges */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg bg-indigo-50/50">
            <img
              className="w-full h-[420px] object-cover object-center hover:scale-105 transition-transform duration-500"
              src={assets.about_image}
              alt="Prescripto Healthcare Specialists"
            />

            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">NABH Accredited & ABDM Compliant</p>
                <p className="text-[11px] text-gray-500">Official Digital Health Partner in India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">About Our Journey</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Bridging the Gap Between Patients & Trusted Hospital Consultants
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Founded with a vision to eliminate hospital waiting queues and digitize medical prescriptions across India, Prescripto Healthcare enables seamless online appointment bookings with certified doctor specialists.
          </p>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Whether you need a routine consultation with a General Physician, specialized cardiac care, dermatology, or pediatric checkups, our platform ensures verified doctor profiles, transparent consultation fees in ₹ (INR), and digital health records accessible 24x7.
          </p>

          <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100/80 space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" /> Our Core Healthcare Mission
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To empower every citizen in India with accessible, high-quality, and transparent healthcare services through cutting-edge digital technology and verified medical professionals.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => navigate("/doctors")}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3 rounded-xl text-xs shadow-md transition"
            >
              <span>Explore Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl text-xs transition"
            >
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Prescripto / Core Pillars Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Why Patients Trust Us</span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Designed for Modern Healthcare Efficiency
          </h2>
          <p className="text-xs text-gray-500">
            Discover why over 50,000+ patients across India rely on Prescripto for their family healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accreditation & Compliance Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t-4 border-primary">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
            <Lock className="w-5 h-5 text-emerald-400" /> ABDM & ISO 27001 Data Privacy Certified
          </h3>
          <p className="text-xs text-gray-400">
            Your personal medical records and prescriptions are encrypted following Ayushman Bharat Digital Mission (ABDM) standards.
          </p>
        </div>

        <button
          onClick={() => navigate("/doctors")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-lg hover:scale-105 transition-all shrink-0"
        >
          Book Your Specialist Visit Now
        </button>
      </div>
    </div>
  );
};

export default About;
