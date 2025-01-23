import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBox, FaCalendarAlt, FaClipboardList } from 'react-icons/fa'; // Importing icons


const WarehouseDetail = () => {
    const [sapCode, setSapCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [totalItems, setTotalItems] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!sapCode || !itemName || !totalItems || !date || !description) {
            setError('All fields are required.');
            return;
        }

        // Handle form submission logic here
        console.log('Form submitted:', { sapCode, itemName, totalItems, date, description });
    };

    return (
        <div className="container mt-5">
            <div className="card text-center p-4 shadow">
                <div className="status-indicator mb-3">
                    <img alt="Icon of stacked boxes" height="300" src="joulestick.png" width="300" />
                </div>
                <h3 className="mb-4">JOULESTICK SUNDAYA</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <input
                                className="form-control"
                                placeholder="SAP Code"
                                type="text"
                                value={sapCode}
                                onChange={(e) => setSapCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Nama Barang"
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Total Barang"
                                type="text"
                                value={totalItems}
                                onChange={(e) => setTotalItems(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="input-group">
                            <span className="input-group-text"><FaCalendarAlt /></span>
                            <input
                                className="form-control"
                                placeholder="Tanggal"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Deskripsi"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="btn btn-primary mt-3" type="submit">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WarehouseDetail;