import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { postInventory } from '../api/axios';
import Swal from 'sweetalert2';

const InputInventory = () => {
    const [sapCode, setSapCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [minStock, setMinStock] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook untuk navigasi

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!sapCode || !itemName || !minStock || !description) {
            setError('All fields are required.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth.username

        // Prepare data payload
        const payload = {
            sap_code: sapCode,
            name : itemName,
            min_stock: parseInt(minStock),
            description,
            user,
        };

        // console.log(payload)

        // Kirim data ke server
        postInventory(payload, (data) => {
            // console.log('Data submitted:', data);

            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been created successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/inventory'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/Inventory')
    }

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'><FaArrowLeft/> Back</button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Tambah Data Inventory</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>SAP Code Barang</h6>
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
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Nama Barang</h6>
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
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Minimal Stock Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Minimal Stock Barang"
                                type="number"
                                value={minStock}
                                onChange={(e) => setMinStock(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="mb-3 form-group">
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
                    </div> */}
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Deskripsi Barang</h6>
                        <textarea
                            className="form-control"
                            placeholder="Deskripsi Barang"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="mt-3 btn btn-primary" type="submit">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InputInventory;