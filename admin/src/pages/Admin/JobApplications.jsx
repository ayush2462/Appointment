import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { ExternalLink } from 'lucide-react';

const JobApplications = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/job-applications', { headers: { aToken } });
      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      fetchApplications();
    }
  }, [aToken]);

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/update-job-application', { applicationId, status }, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        fetchApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='m-5 max-w-7xl'>
      <h2 className='text-2xl font-semibold mb-6'>Manage Job Applications</h2>

      <div className='bg-white border rounded shadow-sm overflow-hidden'>
        <table className='w-full text-left text-sm text-gray-600'>
          <thead className='bg-gray-50 border-b text-gray-700'>
            <tr>
              <th className='p-4 font-semibold'>Tracking ID</th>
              <th className='p-4 font-semibold'>Candidate</th>
              <th className='p-4 font-semibold'>Applied For</th>
              <th className='p-4 font-semibold'>Resume / Docs</th>
              <th className='p-4 font-semibold'>Status</th>
              <th className='p-4 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-medium text-primary'>{app.applicationId}</td>
                  <td className='p-4'>
                    <p className='font-semibold text-gray-800'>{app.name}</p>
                    <p className='text-xs text-gray-500'>{app.email}</p>
                    <p className='text-xs text-gray-500'>{app.phone}</p>
                  </td>
                  <td className='p-4'>
                    <p className='font-medium'>{app.jobTitle}</p>
                    <p className='text-xs text-gray-400'>
                      Applied: {new Date(app.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className='p-4'>
                    {app.resumeLink ? (
                      <a href={app.resumeLink} target="_blank" rel="noreferrer" className='text-blue-500 hover:underline flex items-center gap-1 text-xs mb-1'>
                        <ExternalLink className='w-3 h-3' /> Resume
                      </a>
                    ) : <span className='text-xs text-gray-400 block mb-1'>No Resume</span>}
                    
                    {app.formalityDocuments && app.formalityDocuments.length > 0 && (
                      <div className='mt-2'>
                        <p className='text-xs font-semibold text-gray-700'>Formalities:</p>
                        {app.formalityDocuments.map((doc, i) => (
                          <a key={i} href={doc} target="_blank" rel="noreferrer" className='text-emerald-600 hover:underline flex items-center gap-1 text-[11px] mt-0.5'>
                            <ExternalLink className='w-3 h-3' /> Doc {i+1}
                          </a>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className='p-4'>
                    <span className={`px-2.5 py-1 text-xs rounded-full 
                      ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                        app.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'Selected' ? 'bg-indigo-100 text-indigo-700' :
                        app.status === 'Hired' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className='p-4'>
                    <select 
                      className='border rounded p-1.5 text-xs bg-white outline-none cursor-pointer'
                      value={app.status}
                      onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Selected">Selected</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='p-8 text-center text-gray-500'>No Job Applications Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobApplications;
