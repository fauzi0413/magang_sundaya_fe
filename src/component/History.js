import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa'; // Importing search icon

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // State for filtering status

  // Sample data for the table
  const data = [
    { sapCode: 'SAP001', itemName: 'Item 1', totalItems: 10, status: 'Masuk', date: '01/01/2023', description: 'Description 1' },
    { sapCode: 'SAP002', itemName: 'Item 2', totalItems: 20, status: 'Keluar', date: '02/01/2023', description: 'Description 2' },
    { sapCode: 'SAP003', itemName: 'Item 3', totalItems: 15, status: 'Masuk', date: '03/01/2023', description: 'Description 3' },
    { sapCode: 'SAP004', itemName: 'Item 4', totalItems: 5, status: 'Keluar', date: '04/01/2023', description: 'Description 4' },
  ];

  // Filter data based on search term and status
  const filteredData = data.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle status filter buttons
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mt-3">
      {/* Search Bar */}
      <div className="search-container d-flex mb-3">
        <input 
          type="text" 
          className="form-control search-bar me-2" 
          placeholder="Find the items you need" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-info">
          <FaSearch /> Search
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button 
          className={`btn me-2 ${filterStatus === 'Masuk' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterClick('Masuk')}
        >
          Masuk
        </button>
        <button 
          className={`btn me-2 ${filterStatus === 'Keluar' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterClick('Keluar')}
        >
          Keluar
        </button>
        <button 
          className={`btn ${filterStatus === 'All' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterClick('All')}
        >
          All
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>SAP-CODE</th>
              <th>Nama Barang</th>
              <th>Total Barang</th>
              <th>Status</th>
              <th>Date</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{item.sapCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.totalItems}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
