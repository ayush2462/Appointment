import React from "react";
import {
  Zap,
  FileCheck2,
  PhoneCall,
  ShieldCheck,
  CreditCard,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";

const HomeFeatures = () => {
  const features = [
    {
      icon: Zap,
      color: "bg-blue-50 text-primary border-blue-100",
      title: "Instant Slot Booking",
      desc: "Select your preferred date & time slot. Zero hospital waiting time.",
    },
    {
      icon: FileCheck2,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      title: "Digital Prescription Records",
      desc: "Access your diagnosis, RX prescriptions, and lab history anytime on your phone.",
    },
    {
      icon: PhoneCall,
      color: "bg-rose-50 text-rose-600 border-rose-100",
      title: "24x7 India Emergency Line",
      desc: "Immediate ambulance dispatch (Dial 108) and emergency doctor assistance.",
    },
    {
      icon: ShieldCheck,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      title: "ABDM & NABH Accredited",
      desc: "100% verified hospital consultants, clinic specialists, and privacy assurance.",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto font-sans">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> Why Choose Prescripto Healthcare
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Designed for World-Class Healthcare Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
