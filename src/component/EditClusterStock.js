import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaClipboardList, FaHashtag, FaInbox, FaSitemap } from 'react-icons/fa';
import { getCluster, getClusterStockById, getInventory, putClusterStock, putInventory } from '../api/axios';
import Swal from 'sweetalert2';

const EditClusterStock = () => {
    const { id } = useParams(); // Menangkap ID dari URL
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [cluster, setCluster] = useState([]);
    const [clusterStock, setClusterStock] = useState([]);
    const [inventorys, setInventory] = useState([]);

    // Mengambil data cluster stock berdasarkan ID saat komponen dimuat
    useEffect(() => {
        getClusterStockById(id, (data) => {
            setClusterStock(data);
        });
    }, [id]);
    
    useEffect(() => {
        getInventory((data) => {
            setInventory(data);
        });
    }, []);
    
    useEffect(() => {
        getCluster((data) => {
            setCluster(data);
        });
    }, []);

    // Mengubah nilai dalam form
    const handleChange = (e) => {
        setClusterStock({ ...clusterStock, [e.target.name]: e.target.value });
    };

    // Fungsi untuk submit perubahan
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!clusterStock) {
            setError('Semua kolom harus diisi.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth ? auth.username : 'Unknown';

        // Persiapan data yang akan diupdate
        const payload = {
            id_cluster: clusterStock.id_cluster,
            total_site: parseInt(clusterStock.total_site),
            sap_code: clusterStock.sap_code,
            total: parseInt(clusterStock.total),
            status_barang: clusterStock.status_barang,
            user,
        };

        // Kirim data update ke server
        putClusterStock(id, payload, (data) => {
            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been edit successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/clusterstock'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/clusterstock');
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'>
                <FaArrowLeft /> Back
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Edit Data Cluster Stock</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>ID Cluster</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaHashtag /></span>
                            <select
                                className="form-control"
                                name="id_cluster"
                                value={clusterStock.id_cluster}
                                onChange={handleChange}
                                disabled
                            >
                                <option value={clusterStock.id_cluster}>{clusterStock.id_cluster}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Total Site</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaSitemap /></span>
                            <input
                                className="form-control"
                                placeholder="Total Site"
                                type="number"
                                name="total_site"
                                value={clusterStock.total_site}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>SAP Code</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <select
                                className="form-control"
                                name="sap_code"
                                value={clusterStock.sap_code}
                                onChange={handleChange}
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
                                name="total"
                                value={clusterStock.total}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Status Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaInbox /></span>
                            <select
                                className="form-control"
                                name="status_barang"
                                value={clusterStock.status_barang}
                                onChange={handleChange}
                            >
                                {/* <option value="">Pilih SAP Code</option> */}
                                <option value="baru">Baru</option>
                                <option value="bekas">Bekas</option>
                            </select>
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

export default EditClusterStock;