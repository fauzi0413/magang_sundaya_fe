import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './warehouse.css'; // Ensure this path is correct

const Warehouse = () => {
  return (
    <div className="container">
      <div className="search-bar d-flex mb-4">
        <input type="text" placeholder="Search" className="form-control" />
        <i className="fas fa-search icon">🔎</i>
      </div>
      <div className="filter-buttons mb-4">
        <button className="btn btn-light"><i className="fas fa-calendar-alt">🗓️</i></button>
        <button className="btn btn-light">NOC</button>
        <button className="btn btn-primary active">oM</button>
      </div>
      <div className="item-card mb-3">
        <div className="item-info">
          <h5>Nama Barang</h5>
          <p>sap code, lokasi, tanggal</p>
        </div>
        <div className="item-status d-flex align-items-center">
          <span>5 pcs</span>
          <i className="fas fa-search-plus mx-2"></i>
          <div className="status-dot" style={{ backgroundColor: 'yellow', width: '15px', height: '15px', borderRadius: '50%' }}></div>
        </div>
      </div>
      <div className="item-card mb-3">
        <div className="item-info">
          <h5>Nama Barang</h5>
          <p>sap code, lokasi, tanggal</p>
        </div>
        <div className="item-status d-flex align-items-center">
          <span>0 pcs</span>
          <i className="fas fa-search-plus mx-2"></i>
          <div className="status-dot" style={{ backgroundColor: 'red', width: '15px', height: '15px', borderRadius: '50%' }}></div>
        </div>
      </div>
      <div className="item-card mb-3">
        <div className="item-info">
          <h5>Nama Barang</h5>
          <p>sap code, lokasi, tanggal</p>
        </div>
        <div className="item-status d-flex align-items-center">
          <span>30 pcs</span>
          <i className="fas fa-search-plus mx-2"></i>
          <div className="status-dot" style={{ backgroundColor: 'green', width: '15px', height: '15px', borderRadius: '50%' }}></div>
        </div>
      </div>
      <div className="item-card mb-3">
        <div className="item-info">
          <h5>Nama Barang</h5>
          <p>sap code, lokasi, tanggal</p>
        </div>
        <div className="item-status d-flex align-items-center">
          <span>21 pcs</span>
          <i className="fas fa-search-plus mx-2"></i>
          <div className="status-dot" style={{ backgroundColor: 'green', width: '15px', height: '15px', borderRadius: '50%' }}></div>
        </div>
      </div>
      <button className="btn btn-primary add-button">
        <i className="fas fa-plus">+</i>
      </button>
    </div>
  );
};

export default Warehouse;