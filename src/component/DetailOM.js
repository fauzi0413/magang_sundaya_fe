import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const DetailOM = () => {
  const navigate = useNavigate();

  const handleSend = () => {
    navigate('/TambahOM'); // Ganti dengan path sesuai rute Anda untuk halaman TambahOM
  };

  return (
    <div className="min-h-screen bg-light d-flex align-items-center justify-content-center p-4 vh-100">
      <div className="bg-white rounded-3 shadow-lg w-100 max-w-2xl p-4 card border-0">
        {/* Icon Container */}
        <div className="d-flex justify-content-center mb-4">
          <div className="bg-light rounded-circle p-4 position-relative">
            <div className="badge bg-success position-absolute top-0 start-100 translate-middle">
              <span className="visually-hidden">Status</span>
            </div>
            <svg 
              viewBox="0 0 24 24" 
              className="w-10 h-10 text-warning"
              fill="currentColor"
            >
              <path d="M20 3H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H4V5h16v12zM6 7h12v2H6zm0 4h12v2H6zm0 4h8v2H6z"/>
            </svg>
          </div>
        </div>

        {/* Form Fields */}
        <div className="card-body">
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-barcode text-primary"></i>
              </span>
              <div className="form-control bg-light border-0 text-center">
                <p className="mb-0 text-muted">SAP Code</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-box text-primary"></i>
              </span>
              <div className="form-control bg-light border-0 text-center">
                <p className="mb-0 text-muted">Nama Barang</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-calculator text-primary"></i>
              </span>
              <div className="form-control bg-light border-0 text-center">
                <p className="mb-0 text-muted">Total Barang</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-calendar text-primary"></i>
              </span>
              <div className="form-control bg-light border-0 text-center">
                <p className="mb-0 text-muted">Tanggal</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-file-alt text-primary"></i>
              </span>
              <div className="form-control bg-light border-0 text-center">
                <p className="mb-0 text-muted">Deskripsi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Send Button Container */}
        <div className="d-flex justify-content-center mt-3">
          <button 
            className="btn btn-primary px-5 py-2 rounded-pill shadow-sm hover-shadow-lg d-flex align-items-center gap-2"
            onClick={handleSend}
          >
            <i className="fas fa-paper-plane"></i>
            <span>Send</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="progress" style={{ height: '4px' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: '15%' }}
              aria-valuenow="15" 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOM;
