import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa';
import { getWarehouseLogs } from '../api/axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ViewOrderDetail = () => {
  const [warehouseLogs, setWarehouseLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWarehouseLogs((data) => {
      setWarehouseLogs(data);
    });
  }, []);

  return (
    <div className="container mt-4">
      {/* Tombol Back */}
      <button 
        className="btn mb-3 text-white d-flex align-items-center gap-2 px-4 py-2 rounded-pill"
        style={{ backgroundColor: '#C42B2B', border: 'none' }}
        onClick={() => navigate('/vieworder')}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Table */}
      <div className="card shadow-sm p-4 rounded">
        <h4 className="mb-3 text-center fw-bold">Order Details</h4> {/* Tambahkan gaya tebal */}
        <div className="table-responsive">
          <table className="table table-hover text-center">
            <thead className="table-light">  {/* Pastikan header tabel terlihat */}
              <tr className="fw-bold text-dark"> {/* Menjadikan teks lebih tebal dan terlihat */}
                <th>ID Order</th>
                <th>Date</th>
                <th>SAP Code</th>
                <th>Tujuan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {warehouseLogs.length > 0 ? (
                warehouseLogs.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id_order}</td>
                    <td>{moment(item.date).format('YYYY-MM-DD')}</td>
                    <td>{item.sap_code}</td>
                    <td>{item.tujuan}</td>
                    <td>
                      <span 
                        className={`badge ${item.status_barang === 'success' ? 'bg-success' : 'bg-danger'}`}
                        style={{ fontSize: '1rem', padding: '8px 12px' }}
                      >
                        {item.status_barang === 'success' ? '✔️' : '❌'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetail;
