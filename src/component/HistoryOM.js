import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css'; // Ensure Font Awesome is imported

const HistoryOM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Expanded sample data for the table
  const data = [
    { sabCode: 'SAP001', itemName: 'Item 1', totalItems: 10, status: 'Available', date: '01/01/2023' },
    { sabCode: 'SAP002', itemName: 'Item 2', totalItems: 20, status: 'Out of Stock', date: '02/01/2023' },
    { sabCode: 'SAP003', itemName: 'Item 3', totalItems: 15, status: 'Available', date: '03/01/2023' },
    { sabCode: 'SAP004', itemName: 'Item 4', totalItems: 5, status: 'Available', date: '04/01/2023' },
    { sabCode: 'SAP005', itemName: 'Item 5', totalItems: 0, status: 'Out of Stock', date: '05/01/2023' },
    { sabCode: 'SAP006', itemName: 'Item 6', totalItems: 30, status: 'Available', date: '06/01/2023' },
    { sabCode: 'SAP007', itemName: 'Item 7', totalItems: 25, status: 'Available', date: '07/01/2023' },
    { sabCode: 'SAP008', itemName: 'Item 8', totalItems: 12, status: 'Out of Stock', date: '08/01/2023' },
    { sabCode: 'SAP009', itemName: 'Item 9', totalItems: 18, status: 'Available', date: '09/01/2023' },
    { sabCode: 'SAP010', itemName: 'Item 10', totalItems: 22, status: 'Available', date: '10/01/2023' },
    { sabCode: 'SAP011', itemName: 'Item 11', totalItems: 8, status: 'Out of Stock', date: '11/01/2023' },
    { sabCode: 'SAP012', itemName: 'Item 12', totalItems: 14, status: 'Available', date: '12/01/2023' },
    { sabCode: 'SAP013', itemName: 'Item 13', totalItems: 9, status: 'Available', date: '13/01/2023' },
    { sabCode: 'SAP014', itemName: 'Item 14', totalItems: 11, status: 'Out of Stock', date: '14/01/2023' },
    { sabCode: 'SAP015', itemName: 'Item 15', totalItems: 17, status: 'Available', date: '15/01/2023' },
  ];

  // Filter data based on search term
  const filteredData = data.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-bar d-flex justify-content-center">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Find the items you need" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary">
          <i className="fas fa-search"></i> Search
        </button>
        <div className="btn-group">
          <button className="btn btn-light">Masuk</button>
          <button className="btn btn-light">Keluar</button>
          <button className="btn btn-primary">All</button>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>SAB-CODE</th>
              <th>Nama Barang</th>
              <th>Total Barang</th>
              <th>Status</th>
              <th>Dd/Mm/Yy</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{item.sabCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.totalItems}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                  <td><i className="fas fa-ellipsis-v"></i></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryOM;