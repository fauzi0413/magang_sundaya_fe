//ini after ke send dari warehouse tambah
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaWarehouse, FaClipboardList } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';

const TambahOM = () => {
    const [cluster, setCluster] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!cluster || !quantity) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        // Simulate a submission request
        setTimeout(() => {
            console.log('Submitting:', { cluster, quantity });
            setLoading(false);
            // Reset fields or redirect after successful submission
            setCluster('');
            setQuantity('');
            navigate('/SuccesOM'); // Redirect to SuccessOM page
        }, 2000);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ width: '800px', borderRadius: '10px', height: '500px' }}>
                <div className="login-form p-4">
                    <h3 className="text-center mb-4">Add Warehouse Item</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="cluster" className="form-label">Nama Cluster</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaWarehouse /></span>
                                <select
                                    id="cluster"
                                    className="form-select"
                                    value={cluster}
                                    onChange={(e) => setCluster(e.target.value)}
                                >
                                    <option value="">Select Cluster</option>
                                    <option value="1">Cluster 1</option>
                                    <option value="2">Cluster 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Jumlah Barang</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaClipboardList /></span>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Enter quantity"
                                />
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Loading...' : 'Confirm'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TambahOM;