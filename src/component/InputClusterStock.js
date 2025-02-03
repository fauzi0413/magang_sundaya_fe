import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaClipboardList, FaHashtag, FaInbox, FaSitemap } from 'react-icons/fa';
import { getCluster, getInventory, postClusterStock } from '../api/axios';
import Swal from 'sweetalert2';

const InputClusterStock = () => {
    const [inventorys, setInventory] = useState([]);
    const [cluster, setCluster] = useState([]);
    const [clusterStock, setClusterStock] = useState([]);
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook untuk navigasi
    
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!clusterStock.id_cluster || !clusterStock.total_site || !clusterStock.sap_code || !clusterStock.total_barang || !clusterStock.status_barang) {
            setError("All fields are required.");
            return;
        }
        
        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth.username

        // Prepare data payload
        const payload = {
            id_cluster: clusterStock.id_cluster,
            total_site: parseInt(clusterStock.total_site),
            sap_code: clusterStock.sap_code,
            total: parseInt(clusterStock.total_barang),
            status_barang: clusterStock.status_barang,
            user,
        };

        // Kirim data ke server
        postClusterStock(payload, (data) => {

            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been created successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/clusterstock'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/clusterstock')
    }

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'><FaArrowLeft/> Back</button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Tambah Data Cluster Stock</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>ID Cluster</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaHashtag /></span>
                            <select
                                className="form-control"
                                value={clusterStock.id_cluster}
                                onChange={(e) => setClusterStock({ ...clusterStock, id_cluster: e.target.value })}
                            >
                                <option value="">Pilih ID Cluster</option>
                                {cluster
                                    .map((item) => (
                                        <option key={item.id} value={item.id_cluster}>
                                            {item.id_cluster} - {item.center_point}
                                        </option>
                                    ))}
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
                                value={clusterStock.total_site}
                                onChange={(e) => setClusterStock({ ...clusterStock, total_site: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>SAP Code</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <select
                                className="form-control"
                                value={clusterStock.sap_code}
                                onChange={(e) => setClusterStock({ ...clusterStock, sap_code: e.target.value })}
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
                                value={clusterStock.total_barang}
                                onChange={(e) => setClusterStock({ ...clusterStock, total_barang: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Status Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaInbox /></span>
                            <select
                                className="form-control"
                                value={clusterStock.status_barang}
                                onChange={(e) => setClusterStock({ ...clusterStock, status_barang: e.target.value })}
                            >
                                <option value="">Pilih SAP Code</option>
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

export default InputClusterStock;