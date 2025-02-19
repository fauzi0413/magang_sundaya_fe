import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { getLoginLogs } from '../api/axios';
import moment from 'moment';
import HeaderContent from './utils/HeaderContent'; // Import the HeaderContent component

const LoginLogs = () => {
  const [loginLogs, setLoginLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // Default 'all' lowercase

  useEffect(() => {
    getLoginLogs(setLoginLogs);
  }, []);

  // Filter data berdasarkan pencarian dan status
  const filteredData = loginLogs.filter(item => {
    const matchesSearch =
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.action?.toLowerCase().includes(searchTerm.toLowerCase());
  
    return matchesSearch;
  });
  
  console.log(filteredData)

  return (
    <div className="container mt-5">
      {/* Header for Login Logs */}
      <HeaderContent title="Login Logs" icon="bi-file-earmark-text" />

      {/* Search Bar & Filter Buttons (Sticky Filter) */}
      
        <div className="mb-4 gap-2 d-flex justify-content-center align-items-center" style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          
          {/* Search Input */}
          <div className="shadow-sm input-group rounded-pill" style={{ backgroundColor: '#f8f9fa', padding: '5px' }}>
            <input 
              type="text" 
              className="px-3 bg-transparent border-0 form-control" 
              placeholder="Search by username" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-3 text-white btn rounded-pill" style={{ backgroundColor: '#007BFF' }}>
              <FaSearch /> 
            </button>
          </div>
          
        </div>
     

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='text-center'>No.</th>
              <th>Username</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className='text-center'>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.action}</td>
                  <td>{moment(item.created_at).format('llll')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginLogs;
