import React from 'react';
import { Package } from 'lucide-react';
import { FaClipboardList, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'; // Importing additional icons

const DetailBarang = ({ sapCode, itemName, totalItems, date, description }) => {
  return (
    <div className="card text-center shadow-lg">
      <div className="indicator"></div>
      <div className="status-indicator mb-3">
                    <img alt="Icon of stacked boxes" height="300" src="joulestick.png" width="300" />
                </div>
      
      <div className="card-body align-items-center">
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex align-items-center">
          <FaClipboardList className="me-2 " /> 
          <span>SAP Code: <strong>{sapCode}</strong></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <Package className="me-2" /> 
          <span>Nama Barang: <strong>{itemName}</strong></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <FaInfoCircle className="me-2" /> 
          <span>Total Barang: <strong>{totalItems}</strong></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <FaCalendarAlt className="me-2" /> 
          <span>Tanggal: <strong>{date}</strong></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <FaInfoCircle className="me-2" /> 
          <span>Deskripsi: <strong>{description}</strong></span>
        </li>
        
      </ul>
      <button className="btn btn-primary mt-3 ">
        Kirim
      </button>
      </div>
    </div>
  );
};

export default DetailBarang;