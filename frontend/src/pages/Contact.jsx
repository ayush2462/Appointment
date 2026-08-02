import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import ApplicationTracker from "../components/ApplicationTracker";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Briefcase,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Building2,
  X,
  Sparkles,
  PhoneCall,
  Search
} from "lucide-react";

const Contact = () => {
  const { backendUrl } = useContext(AppContext);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Doctor Appointment",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Job Portal State
  const [jobOpenings, setJobOpenings] = useState([]);
  const [showJobsModal, setShowJobsModal] = useState(false);
  const [appliedJob, setAppliedJob] = useState(null); // Which job user is currently applying for
  const [showTracker, setShowTracker] = useState(false);
  const [trackingId, setTrackingId] = useState(null); // ID generated after successful application

  // Application Form State
  const [appFormData, setAppFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: ""
  });
  const [appLoading, setAppLoading] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Fetch Open Jobs on Mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/user/job-openings");
        if (data.success) {
          setJobOpenings(data.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/contact",
        formData
      );

      if (data.success) {
        setSubmitted(true);
        toast.success(data.message || "Thank you! Your inquiry has been submitted.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Doctor Appointment",
          message: "",
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyJob = async (e) => {
    e.preventDefault();
    if (!appFormData.name || !appFormData.email || !appFormData.phone) {
      return toast.error("Name, Email, and Phone are required");
    }

    try {
      setAppLoading(true);
      const payload = {
        jobId: appliedJob._id,
        ...appFormData
      };
      const { data } = await axios.post(backendUrl + '/api/user/apply-job', payload);
      
      if (data.success) {
        setTrackingId(data.trackingId);
        toast.success(data.message);
        setAppFormData({ name: "", email: "", phone: "", resumeLink: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAppLoading(false);
    }
  };

  const faqs = [
    {
      q: "How do I book a doctor appointment online?",
      a: "Browse through our specialist doctors list, select your preferred hospital department or doctor, pick an available slot date & time, and confirm your booking instantly.",
    },
    {
      q: "Can I view my past doctor prescriptions and consultation records online?",
      a: "Yes! All past consultation notes, doctor prescriptions, and appointment fee receipts are saved securely under your 'My Patient Records' section in your account.",
    },
    {
      q: "Can I cancel or reschedule my consultation slot?",
      a: "Yes, you can manage or cancel your scheduled appointments directly from your 'My Patient Records' tab prior to your scheduled consultation time.",
    },
    {
      q: "Are the hospital departments ABDM & NABH accredited?",
      a: "Yes, all listed doctors, hospital units, and digital health records strictly comply with Ayushman Bharat Digital Mission (ABDM) guidelines and NABH quality benchmarks.",
    },
  ];

  return (
    <div className="font-sans text-gray-800 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-indigo-50/70 via-white to-white py-12 px-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
          <Sparkles className="w-3.5 h-3.5" /> 24/7 Patient Help & Assistance Desk
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Get in Touch With <span className="text-primary">Prescripto India</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mt-3">
          Have questions regarding doctor availability, consultation fees, or medical records? Contact our patient support team.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 space-y-16">
        {/* Quick Contact Info Cards (India Details) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Corporate HQ (India)</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Prescripto Medical Tower, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Helpline & Emergency</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Toll-Free: 1800-123-4567 <br />
              Emergency Line: Dial 108
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Support Email</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              support@prescripto.in <br />
              care@prescripto.in
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Consultation Hours</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Mon - Sat: 8:00 AM - 9:00 PM IST <br />
              Sun: 9:00 AM - 4:00 PM IST
            </p>
          </div>
        </div>

        {/* Office & Careers Showcase */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl border border-gray-100 shadow-sm relative group">
            <img
              src={assets.contact_image}
              alt="Prescripto Hospital & Medical Center India"
              className="w-full h-80 lg:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-800">Prescripto India HQ</p>
                <p className="text-[11px] text-gray-500">BKC Tower, Mumbai</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-semibold text-[10px] rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Open Today
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                India Corporate Office
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
                OUR MUMBAI HEADQUARTERS
              </h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    Prescripto Medical Tower, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051, India
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Appointments Desk: +91 1800-123-4567 / +91 98765 43210</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>Email: support@prescripto.in | care@prescripto.in</span>
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100/70">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary font-bold text-base">
                  <Briefcase className="w-5 h-5" />
                  <span>CAREERS AT PRESCRIPTO INDIA</span>
                </div>
                <button onClick={() => setShowTracker(true)} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-100/50 px-2.5 py-1 rounded-full">
                  <Search className="w-3 h-3" /> Track App
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Join our growing network of hospital consultants, resident doctors, and clinical care coordinators. View open positions below.
              </p>
              <button
                onClick={() => setShowJobsModal(true)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center gap-2"
              >
                Explore Job Openings
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form & Information Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-primary via-indigo-600 to-blue-700 text-white p-8 rounded-3xl shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

              <div>
                <h3 className="text-xl font-extrabold mb-2">Patient Assistance Desk</h3>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Our dedicated patient care coordinators respond to all online inquiries within 2 business hours.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-md">
                  <Building2 className="w-5 h-5 text-indigo-200 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Support Email</p>
                    <p className="text-indigo-200 text-[11px]">support@prescripto.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-md">
                  <PhoneCall className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Emergency Helpline (24x7)</p>
                    <p className="text-emerald-300 font-bold text-[11px]">Dial 108 (India Emergency)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form (CORRECT INPUT FIELD ORDER) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200/90 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Patient Contact & Inquiry Form
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Please enter your details below. Our healthcare representative will contact you promptly.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you for reaching out to Prescripto India. We have received your query and will reply via email/phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* FIELD 1: Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    1. Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>

                {/* FIELD 2 & 3: Email Address & Phone Number (Row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      2. Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajesh.kumar@gmail.com"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      3. Phone Number (+91)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>

                {/* FIELD 4: Subject Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    4. Inquiry Subject / Department
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none bg-white focus:border-primary focus:ring-1 focus:ring-primary transition"
                  >
                    <option value="Doctor Appointment">Doctor Appointment</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Medical Records Request">Medical Records Request</option>
                    <option value="Billing & Insurance">Billing & Insurance</option>
                    <option value="Feedback / Complaint">Feedback / Complaint</option>
                  </select>
                </div>

                {/* FIELD 5: Detailed Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    5. Detailed Message / Inquiry Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your query or consultation request..."
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-gray-50/80 rounded-3xl p-8 border border-gray-200/80 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h3>
            <p className="text-xs text-gray-500 mt-1">
              Quick answers to common questions about doctor bookings and health services in India.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-sm text-gray-800 hover:text-primary transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CAREERS EXPLORE JOBS MODAL */}
      {showJobsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 py-10 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200 my-auto">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-gray-800 text-base">
                  {appliedJob ? `Apply for ${appliedJob.title}` : "Medical & Clinical Job Openings"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowJobsModal(false);
                  setAppliedJob(null);
                  setTrackingId(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200/60 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              {trackingId ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Application Submitted!</h4>
                    <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
                      Your interest for <span className="font-bold">{appliedJob.title}</span> has been received successfully.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-emerald-100 p-4 rounded-xl inline-block mt-4 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Your Tracking ID</p>
                    <p className="text-xl font-extrabold text-primary tracking-widest">{trackingId}</p>
                    <p className="text-[11px] text-gray-500 mt-2">
                      Please save this ID. You can use it along with your email to track your application status.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setAppliedJob(null);
                        setTrackingId(null);
                      }}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Back to Openings
                    </button>
                  </div>
                </div>
              ) : appliedJob ? (
                <form onSubmit={handleApplyJob} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input type="text" required value={appFormData.name} onChange={e => setAppFormData({...appFormData, name: e.target.value})} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary text-sm" placeholder="Your Name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                      <input type="email" required value={appFormData.email} onChange={e => setAppFormData({...appFormData, email: e.target.value})} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary text-sm" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                      <input type="tel" required value={appFormData.phone} onChange={e => setAppFormData({...appFormData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary text-sm" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Resume / CV Link (Optional)</label>
                    <input type="url" value={appFormData.resumeLink} onChange={e => setAppFormData({...appFormData, resumeLink: e.target.value})} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary text-sm" placeholder="e.g. Google Drive Link, LinkedIn Profile..." />
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-6">
                    <button type="submit" disabled={appLoading} className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition disabled:opacity-50">
                      {appLoading ? "Submitting..." : "Submit Application"}
                    </button>
                    <button type="button" onClick={() => setAppliedJob(null)} className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold text-sm transition">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {jobOpenings.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">There are no job openings at the moment. Please check back later.</p>
                  ) : (
                    jobOpenings.map((job) => (
                      <div
                        key={job._id}
                        className="p-4 rounded-2xl border border-gray-200 hover:border-primary/50 transition bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-sm">{job.title}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-primary rounded-full">
                              {job.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {job.department} • {job.location}
                          </p>
                          <p className="text-xs text-gray-600 mt-2">{job.description}</p>
                        </div>
    
                        <button
                          onClick={() => setAppliedJob(job)}
                          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold shadow-sm shrink-0 transition"
                        >
                          Apply Now
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Tracker Modal */}
      {showTracker && <ApplicationTracker onClose={() => setShowTracker(false)} />}
    </div>
  );
};

export default Contact;
