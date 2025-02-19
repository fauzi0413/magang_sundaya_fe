import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { FaArrowLeft, FaBox, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { getInventory, getWarehouse, getWarehouseById, postInventory, postWarehouse, putWarehouse } from '../api/axios';
=======
import { FaArrowLeft, FaBox, FaClipboardList } from 'react-icons/fa';
import { getWarehouseById, putWarehouse } from '../api/axios';
>>>>>>> 45558cc (initial commit)
import Swal from 'sweetalert2';

const EditWarehouse = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams(); // Menangkap ID dari URL
    
    const navigate = useNavigate(); // Hook untuk navigasi
    
    // Mengambil data warehouse berdasarkan ID saat komponen dimuat
    useEffect(() => {
        getWarehouseById(id, (data) => {
            setWarehouse(data);
        });
    }, [id]);

    // Mengubah nilai dalam form
    const handleChange = (e) => {
        setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
<<<<<<< HEAD
        if (!warehouse.total_barang) {
=======
        if (!warehouse.min_stock) {
>>>>>>> 45558cc (initial commit)
            setError('All fields are required.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth.username

        // Prepare data payload
        const payload = {
<<<<<<< HEAD
            total_barang: parseInt(warehouse.total_barang),
=======
            min_stock: parseInt(warehouse.min_stock),
>>>>>>> 45558cc (initial commit)
            status_barang: "baru",
            user,
        };

        // Kirim data ke server
        putWarehouse(id, payload, (data) => {

            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been edit successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/warehouse'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/warehouse')
    }

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'><FaArrowLeft/> Back</button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Edit Data Barang Warehouse</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>SAP Code Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <input
                                className="form-control"
                                placeholder="SAP Code"
                                type="text"
                                name="sap_code"
                                value={warehouse.sap_code}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="mb-3 form-group">
<<<<<<< HEAD
                        <h6 className='text-start'>Total Stock Barang</h6>
=======
                        <h6 className='text-start'>Minimal Stock Barang</h6>
>>>>>>> 45558cc (initial commit)
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
<<<<<<< HEAD
                                placeholder="Total Stock Barang"
                                type="number"
                                name="total_barang"
                                value={warehouse.total_barang}
=======
                                placeholder="Minimal Stock Barang"
                                type="number"
                                name="min_stock"
                                value={warehouse.min_stock}
>>>>>>> 45558cc (initial commit)
                                onChange={handleChange}
                            />
                        </div>
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

export default EditWarehouse;