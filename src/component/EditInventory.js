import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaClipboardList } from 'react-icons/fa';
import { getInventoryById, putInventory } from '../api/axios';
import Swal from 'sweetalert2';

const EditInventory = () => {
    const { id } = useParams(); // Menangkap ID dari URL
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [inventory, setInventory] = useState([]);

    // Mengambil data inventory berdasarkan ID saat komponen dimuat
    useEffect(() => {
        getInventoryById(id, (data) => {
            setInventory(data);
        });
    }, [id]);

    // Mengubah nilai dalam form
    const handleChange = (e) => {
        setInventory({ ...inventory, [e.target.name]: e.target.value });
    };

    // Fungsi untuk submit perubahan
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!inventory.sap_code || !inventory.name || !inventory.min_stock || !inventory.description) {
            setError('Semua kolom harus diisi.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth ? auth.username : 'Unknown';

        // Persiapan data yang akan diupdate
        const payload = {
            name: inventory.name,
            status: inventory.status,
            min_stock: parseInt(inventory.min_stock),
            description: inventory.description,
            user,
        };

        // console.log("Mengupdate data:", payload);

        // Kirim data update ke server
        putInventory(id, payload, (data) => {
            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been edit successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/inventory'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/inventory');
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'>
                <FaArrowLeft /> Back
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Edit Data Inventory</h3>
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
                                value={inventory.sap_code}
                                onChange={handleChange}
                                disabled
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
                                name="name"
                                value={inventory.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Status Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <select
                                className="form-control"
                                name="status"
                                value={inventory.status}
                                onChange={handleChange}
                            >
                                <option value="show">Show</option>
                                <option value="hide">Hide</option>
                            </select>
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
                                name="min_stock"
                                value={inventory.min_stock}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Deskripsi Barang</h6>
                        <textarea
                            className="form-control"
                            placeholder="Deskripsi Barang"
                            rows="3"
                            name="description"
                            value={inventory.description}
                            onChange={handleChange}
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

export default EditInventory;