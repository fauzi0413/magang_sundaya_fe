//setelah warehouse tambah berhasil
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon from react-icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation

const SuccesTambah = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleContinue = () => {
        // Redirect to DashboardOM page
        navigate('/DashboardOM');
    };

    const handleGoBack = () => {
        // Redirect to ItemDataOM page
        navigate('/ItemDataOM');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card text-center shadow-lg" style={{ width: '600px', borderRadius: '10px', height: '300px' }}>
                <div className="card-body">
                    <FaCheckCircle className="text-success mb-3" style={{ fontSize: '100px' }} />
                    <h1 className="card-title">Success!</h1>
                    <p className="card-text">Inputan anda telah berhasil</p>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary me-2" onClick={handleContinue}>
                            Continue
                        </button>
                        <button className="btn btn-secondary" onClick={handleGoBack}>
                             Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccesTambah;