import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { FaArrowLeft, FaBox, FaClipboardList, FaEdit } from 'react-icons/fa';
import { getInventory, getWarehouseById } from '../api/axios';

const ClusterDetail = () => {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState(null);
=======
import { FaArrowLeft, FaArrowRight, FaBox, FaClipboardList, FaEdit, FaEye } from 'react-icons/fa';
import { getClusterById, getClusterStock, getInventory } from '../api/axios';

const ClusterDetail = () => {
    const { id } = useParams();
    const [clusters, setCluster] = useState([]);
    const [clusterStocks, setClusterStock] = useState([]);
>>>>>>> 45558cc (initial commit)
    const [inventorys, setInventory] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
        getInventory((data) => {
            setInventory(data);
        });
    }, []);

    useEffect(() => {
        getWarehouseById(id, (data) => {
            setWarehouse(data);
=======
        getClusterById(id, (data) => {
            setCluster(data);
>>>>>>> 45558cc (initial commit)
        }, () => {
            setError('Gagal mengambil data warehouse');
        });
    }, [id]);
<<<<<<< HEAD

    const handleBack = () => {
        navigate('/warehouse');
    };

    const handleEditWarehouse = (e, id) => {
        e.preventDefault();
        navigate(`/warehouse/edit/${id}`);
    };

    const getStockStatus = (total_barang, min_stock) => {
        if (total_barang === 0) {
            return { status: "Kosong", warna: "danger" }; // Merah
        } 
        else if (total_barang <= min_stock) {
            return { status: "Butuh Restock", warna: "warning" }; // Kuning
        }
        else {
            return { status: "Ada", warna: "success" }; // Hijau
        } 
    };

    if (!warehouse) {
        return <div className="container mt-5">Memuat data...</div>;
    }

    const matchedInventory = inventorys.find((inventory) => inventory.sap_code === warehouse.sap_code);
    const min_stock = matchedInventory?.min_stock || 0;
    const name = matchedInventory?.name || "Unknown Item"; 
    const description = matchedInventory?.description || "No description available";
    const { status, warna } = getStockStatus(warehouse.total_barang, min_stock);

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="mb-3 btn btn-danger">
                <FaArrowLeft /> Back
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Detail Data Barang Warehouse</h3>
                <form className='row'>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">SAP Code Barang</h6>
=======
    
    useEffect(() => {
        getInventory(setInventory);
        getClusterStock(setClusterStock)
    }, []);

    const handleBack = () => {
        navigate('/cluster');
    };

    // Handle detail Cluster Stock
    const handleDetailClusterStock= (id) => {
        navigate(`/clusterstock/${id}`); // Navigasi ke halaman Cluster Stock
    };
    
    const handleEditCluster = (e, id) => {
        e.preventDefault();
        navigate(`/cluster/edit/${id}`);
    };

    if (!clusters) {
        return <div className="container mt-5">Memuat data...</div>;
    }
    
    const filteredData = clusterStocks.filter((clusterStock) => clusterStock.id_cluster === clusters.id_cluster);
    
    const getStockStatus = (total_barang, min_stock) => {
        if (total_barang === 0) return { status: "Kosong", warna: "danger" }; // Merah
        if (total_barang <= min_stock) return { status: "Butuh Restock", warna: "warning" }; // Kuning
        return { status: "Ada", warna: "success" }; // Hijau
    };
    
    const matchedInventory = inventorys.find((inventory) => inventory.sap_code === clusterStocks.sap_code);
    const min_stock = matchedInventory?.min_stock || 0;
    const { status, warna } = getStockStatus(clusterStocks.total, min_stock);

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="mb-3 me-3 btn btn-danger">
                <FaArrowLeft /> Back
            </button>
            <button onClick={(e) => handleEditCluster(e, clusters.id)} className="mb-3 btn btn-primary">
                Edit <FaArrowRight />
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Detail Data Cluster</h3>
                <form className='row'>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">ID Cluster</h6>
>>>>>>> 45558cc (initial commit)
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <input
                                className="form-control"
<<<<<<< HEAD
                                placeholder="SAP Code"
                                type="text"
                                name="sap_code"
                                value={warehouse.sap_code}
=======
                                placeholder="ID cluster"
                                type="text"
                                name="id_cluster"
                                value={clusters.id_cluster}
>>>>>>> 45558cc (initial commit)
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
<<<<<<< HEAD
                        <h6 className="text-start">Nama Barang</h6>
=======
                        <h6 className="text-start">Center Point</h6>
>>>>>>> 45558cc (initial commit)
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
<<<<<<< HEAD
                                placeholder="Nama Barang"
                                type="text"
                                name="name"
                                value={name}
=======
                                placeholder="Nama Center Point"
                                type="text"
                                name="center_point"
                                value={clusters.center_point}
>>>>>>> 45558cc (initial commit)
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
<<<<<<< HEAD
                        <h6 className="text-start">
                            Total Barang 
                            <span className={`ms-2 badge bg-${warna}`}>{status}</span>
                        </h6>
=======
                        <h6 className="text-start">Provinsi</h6>
>>>>>>> 45558cc (initial commit)
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Total Barang"
<<<<<<< HEAD
                                type="number"
                                name="total_barang"
                                value={warehouse.total_barang}
=======
                                type="text"
                                name="provinsi"
                                value={clusters.provinsi}
>>>>>>> 45558cc (initial commit)
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
<<<<<<< HEAD
                        <h6 className="text-start">Minimal Stock Barang</h6>
=======
                        <h6 className="text-start">Kabupaten / Kota</h6>
>>>>>>> 45558cc (initial commit)
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
<<<<<<< HEAD
                                placeholder="Min Stock"
                                type="number"
                                value={min_stock}
=======
                                placeholder="Kabupaten atau kota"
                                type="text"
                                value={clusters.kabupaten_kota}
>>>>>>> 45558cc (initial commit)
                                readOnly
                            />
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="mb-3 form-group">
                        <h6 className="text-start">Deskripsi</h6>
                        <textarea
                            className="form-control"
                            placeholder="Deskripsi"
                            rows="3"
                            name="description"
                            value={description}
                            readOnly
                        />
                    </div>
                    
                    <button 
                        className="btn btn-primary"
                        onClick={(e) => handleEditWarehouse(e, warehouse.id)}
                    >
                        <FaEdit /> Edit
                    </button>
                </form>
=======
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">PIC</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="PIC cluster"
                                type="text"
                                value={clusters.pic}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Contact</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Contact PIC"
                                type="text"
                                value={clusters.contact}
                                readOnly
                            />
                        </div>
                    </div>
                </form>

                <h3 className="mb-4">Cluster Stock {clusters.center_point} ({clusters.id_cluster})</h3>
                <div className="table-container">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th className='text-center'>No. </th>
                        <th className='text-center'>SAP Code</th>
                        <th className='text-center'>ID Cluster</th>
                        <th className='text-center'>Total Site</th>
                        <th className='text-center'>Total Barang</th>
                        <th className='text-center'>Status Barang</th>
                        <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                        clusterStocks.map((clusterStock, index) => (
                            <tr key={clusterStock.id}>
                            <td>{index + 1}</td>
                            <td>{clusterStock.sap_code}</td>
                            <td>{clusterStock.id_cluster}</td>
                            <td>{clusterStock.total_site}</td>
                            <td>{clusterStock.total}</td>
                            <td><span className={`ms-2 badge bg-${warna}`}>{status}</span></td>
                            <td>
                                <button className='btn' onClick={() => handleDetailClusterStock(clusterStock.id)}><FaEye></FaEye></button>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No data found</td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>

>>>>>>> 45558cc (initial commit)
            </div>
        </div>
    );
};

export default ClusterDetail;
