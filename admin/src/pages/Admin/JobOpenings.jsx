import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const JobOpenings = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-Time',
    department: '',
    location: '',
    description: ''
  });

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/job-openings', { headers: { aToken } });
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      fetchJobs();
    }
  }, [aToken]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(backendUrl + '/api/admin/job-openings/add', formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setShowForm(false);
        setFormData({
          title: '',
          type: 'Full-Time',
          department: '',
          location: '',
          description: ''
        });
        fetchJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (jobId, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/update-job-opening', { jobId, status }, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        fetchJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='m-5 max-w-6xl'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Manage Job Openings</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className='bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition'
        >
          {showForm ? 'Close Form' : '+ Add New Job'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddJob} className='bg-white p-8 border rounded shadow-sm mb-8'>
          <h3 className='text-lg font-semibold mb-4'>Create New Job Opening</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-600 mb-1'>Job Title</label>
              <input type="text" required className='w-full border p-2 rounded' value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Senior Cardiologist" />
            </div>
            <div>
              <label className='block text-sm text-gray-600 mb-1'>Job Type</label>
              <select className='w-full border p-2 rounded' value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className='block text-sm text-gray-600 mb-1'>Department</label>
              <input type="text" required className='w-full border p-2 rounded' value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="e.g. Cardiology" />
            </div>
            <div>
              <label className='block text-sm text-gray-600 mb-1'>Location</label>
              <input type="text" required className='w-full border p-2 rounded' value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. BKC Campus, Mumbai" />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm text-gray-600 mb-1'>Job Description</label>
              <textarea required rows={4} className='w-full border p-2 rounded' value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the role and requirements..."></textarea>
            </div>
          </div>
          <button type="submit" disabled={loading} className='mt-4 bg-primary text-white px-6 py-2 rounded shadow'>
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </form>
      )}

      <div className='bg-white border rounded shadow-sm overflow-hidden'>
        <table className='w-full text-left text-sm text-gray-600'>
          <thead className='bg-gray-50 border-b text-gray-700'>
            <tr>
              <th className='p-4 font-semibold'>Job Title</th>
              <th className='p-4 font-semibold'>Dept & Type</th>
              <th className='p-4 font-semibold'>Location</th>
              <th className='p-4 font-semibold'>Date Added</th>
              <th className='p-4 font-semibold'>Status</th>
              <th className='p-4 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index} className='border-b hover:bg-gray-50'>
                  <td className='p-4 font-medium text-gray-800'>{job.title}</td>
                  <td className='p-4'>{job.department} <br/><span className='text-xs text-primary'>{job.type}</span></td>
                  <td className='p-4'>{job.location}</td>
                  <td className='p-4'>{new Date(job.date).toLocaleDateString()}</td>
                  <td className='p-4'>
                    <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className='p-4'>
                    <select 
                      className='border rounded p-1 text-sm bg-white outline-none'
                      value={job.status}
                      onChange={(e) => handleUpdateStatus(job._id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='p-8 text-center text-gray-500'>No Job Openings Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobOpenings;
