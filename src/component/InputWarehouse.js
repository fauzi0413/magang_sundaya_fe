import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { getInventory, postInventory, postWarehouse } from '../api/axios';
import Swal from 'sweetalert2';

const InputWarehouse = () => {
    const [inventorys, setInventory] = useState([]);
    const [sapCode, setSapCode] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook untuk navigasi
    
    useEffect(() => {
    getInventory((data) => {
        setInventory(data);
    });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!stock) {
            setError('All fields are required.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth.username

        // Prepare data payload
        const payload = {
            sap_code: sapCode,
            total_barang: parseInt(stock),
            status_barang: "baru",
            user,
        };

        // Kirim data ke server
        postWarehouse(payload, (data) => {

            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been created successfully.",
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
                <h3 className="mb-4">Tambah Data Barang Warehouse</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>SAP Code Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <select
                                className="form-control"
                                value={sapCode}
                                onChange={(e) => setSapCode(e.target.value)}
                            >
                                <option value="">Pilih SAP Code</option>
                                {inventorys
                                    .filter(item => item.status === "show") // Hanya menampilkan data dengan status "show"
                                    .map((item) => (
                                        <option key={item.id} value={item.sap_code}>
                                            {item.sap_code} - {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Total Stock Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Total Stock Barang"
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
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
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="mt-3 btn btn-primary" type="submit">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InputWarehouse;