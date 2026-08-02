import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { X, Search, FileText, CheckCircle2, UploadCloud, FileUp } from 'lucide-react';

const ApplicationTracker = ({ onClose }) => {
  const { backendUrl } = useContext(AppContext);
  
  const [trackingId, setTrackingId] = useState('');
  const [email, setEmail] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId || !email) return toast.error("Please enter both ID and Email");
    
    try {
      setLoading(true);
      const { data } = await axios.post(backendUrl + '/api/user/track-application', { applicationId: trackingId, email });
      if (data.success) {
        setApplication(data.application);
      } else {
        toast.error(data.message);
        setApplication(null);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file to upload");
    
    const formData = new FormData();
    formData.append("applicationId", application.applicationId);
    formData.append("email", application.email);
    formData.append("document", file);

    try {
      setUploading(true);
      const { data } = await axios.post(backendUrl + '/api/user/upload-formality', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (data.success) {
        toast.success(data.message);
        // Refresh application state
        setApplication({ ...application, formalityDocuments: [...application.formalityDocuments, data.documentUrl] });
        setFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-800 text-base">Track Job Application</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200/60 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!application ? (
            <form onSubmit={handleTrack} className="space-y-4">
              <p className="text-xs text-gray-500 mb-4">Enter your tracking details below to check the status of your medical or clinical job application.</p>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tracking ID</label>
                <input type="text" required value={trackingId} onChange={e => setTrackingId(e.target.value)} placeholder="e.g. APP-123456" className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-primary transition" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Registered Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-primary transition" />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold text-xs shadow-md transition disabled:opacity-50 mt-2">
                {loading ? "Searching..." : "Track Status"}
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="text-center pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-indigo-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-gray-800">{application.jobTitle}</h4>
                <p className="text-xs text-gray-500 mt-1">Applicant: <span className="font-semibold text-gray-700">{application.name}</span></p>
                <p className="text-[10px] text-gray-400 mt-1">Applied: {new Date(application.date).toLocaleDateString()}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Current Status</p>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 text-sm font-bold rounded-lg 
                    ${application.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      application.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      application.status === 'Selected' ? 'bg-indigo-100 text-indigo-700' :
                      application.status === 'Hired' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'}`}>
                    {application.status}
                  </span>
                  {application.status === 'Selected' && (
                    <span className="text-xs text-indigo-600 font-semibold animate-pulse">Action Required</span>
                  )}
                </div>
                
                {application.adminNotes && (
                  <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Message from HR</p>
                    <p className="text-xs text-gray-700">{application.adminNotes}</p>
                  </div>
                )}
              </div>

              {application.status === 'Selected' && (
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                  <p className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1"><UploadCloud className="w-3.5 h-3.5"/> Complete Formalities</p>
                  <p className="text-[11px] text-gray-600 mb-3">Please upload your ID Proof, Medical License, or any other requested documents.</p>
                  
                  <form onSubmit={handleUpload} className="flex gap-2">
                    <input type="file" required onChange={e => setFile(e.target.files[0])} className="text-[10px] flex-1 block w-full text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-gray-200 rounded-full bg-white p-1" />
                    <button type="submit" disabled={uploading} className="bg-indigo-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-indigo-700 disabled:opacity-50">
                      {uploading ? "..." : "Upload"}
                    </button>
                  </form>

                  {application.formalityDocuments && application.formalityDocuments.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-[10px] font-bold text-gray-500">Uploaded Documents:</p>
                      {application.formalityDocuments.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Document {idx+1} Uploaded
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button onClick={() => setApplication(null)} className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-800 pt-2">
                Check Another ID
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
