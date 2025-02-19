import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { getWarehouseLogs } from '../api/axios';
import moment from 'moment';
<<<<<<< HEAD

=======
import HeaderContent from './utils/HeaderContent';
>>>>>>> 45558cc (initial commit)
const History = () => {
  const [warehouseLogs, setWarehouseLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // Default 'all' lowercase

  useEffect(() => {
    getWarehouseLogs((data) => {
      setWarehouseLogs(data);
    });
  }, []);

  // Filter data berdasarkan pencarian dan status
  const filteredData = warehouseLogs.filter(item => {
    const matchesSearch =
      item.sap_code?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.user?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || item.status_barang?.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mt-5">
<<<<<<< HEAD
      {/* Search Bar & Filter Buttons (Sticky Filter) */}
      <div className="top-0 p-3 mb-4 bg-white rounded shadow-sm position-sticky">
        <div className="gap-2 d-flex justify-content-center align-items-center" style={{ maxWidth: '900px', width: '100%' }}>
=======
      {/* Header for Login Logs */}
      <HeaderContent title="Warehouse Stock Logs" icon="bi-file-earmark-text" />
      {/* Search Bar & Filter Buttons (Sticky Filter) */}
      {/* <div className="top-0 p-3 mb-4 bg-white rounded shadow-sm position-sticky"> */}
        <div className="mb-4 gap-2 d-flex justify-content-center align-items-center" style={{  width: '100%' }}>
>>>>>>> 45558cc (initial commit)
          
          {/* Search Input */}
          <div className="shadow-sm input-group rounded-pill" style={{ backgroundColor: '#f8f9fa', padding: '5px' }}>
            <input 
              type="text" 
              className="px-3 bg-transparent border-0 form-control" 
              placeholder="Cari barang..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-3 text-white btn rounded-pill" style={{ backgroundColor: '#007BFF' }}>
              <FaSearch /> 
            </button>
          </div>
          
          {/* Filter Buttons */}
          {['All', 'Masuk', 'Keluar', 'Tetap'].map((status) => (
            <button 
              key={status}
              className={`btn rounded-pill px-3 ${filterStatus === status.toLowerCase() ? 'text-white' : 'btn-light'}`} 
              style={{ backgroundColor: filterStatus === status.toLowerCase() ? '#C42B2B' : '#f8f9fa', color: filterStatus === status.toLowerCase() ? 'white' : 'black' }}
              onClick={() => setFilterStatus(status.toLowerCase())}
            >
              {status}
            </button>
          ))}
        </div>
<<<<<<< HEAD
      </div>
=======
      {/* </div> */}
>>>>>>> 45558cc (initial commit)

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>SAP CODE</th>
<<<<<<< HEAD
              <th>Total Barang</th>
=======
              <th>Min Stock</th>
>>>>>>> 45558cc (initial commit)
              <th>Status</th>
              <th>Action</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.sap_code}</td>
<<<<<<< HEAD
                  <td>{item.total_barang}</td>
=======
                  <td>{item.min_stock}</td>
>>>>>>> 45558cc (initial commit)
                  <td>{item.status_barang}</td>
                  <td>{item.action}</td>
                  <td>{item.user}</td>
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

export default History;
