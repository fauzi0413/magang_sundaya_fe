import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaArrowRight, FaBox, FaClipboardList, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { getClusterStockById, getInventory, getMaterial } from '../api/axios';

const ClusterStockDetail = () => {
    const { id } = useParams();
    const [clusterStocks, setClusterStock] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [inventorys, setInventory] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getInventory(setInventory);
        getMaterial(setMaterials)
    }, []);

    useEffect(() => {
        getClusterStockById(id, (data) => {
            setClusterStock(data);
        }, () => {
            setError('Gagal mengambil data cluster stock');
        });
    }, [id]);

    const handleBack = () => {
        navigate('/clusterstock');
    };

    const handleEditWarehouse = (e, id) => {
        e.preventDefault();
        navigate(`/clusterstock/edit/${id}`);
    };

    const getStockStatus = (total_barang, min_stock) => {
        if (total_barang === 0) return { status: "Kosong", warna: "danger" }; // Merah
        if (total_barang <= min_stock) return { status: "Butuh Restock", warna: "warning" }; // Kuning
        return { status: "Ada", warna: "success" }; // Hijau
    };

    const getItemName = (sap_code) => {
        const item = inventorys.find(i => i.sap_code === sap_code);
        return item ? item.name : 'Unknown';
    };

    const getStatus = (status) => (status === "baru" ? "Baru" : "Bekas");

    if (!clusterStocks) {
        return <div className="container mt-5">Memuat data...</div>;
    }

    const filteredData = materials.filter((material) => material.id_item === clusterStocks.id_cluster && material.sap_code === clusterStocks.sap_code);
    
    const matchedInventory = inventorys.find((inventory) => inventory.sap_code === clusterStocks.sap_code);
    const min_stock = matchedInventory?.min_stock || 0;
    const name = matchedInventory?.name || "Unknown Item"; 
    const description = matchedInventory?.description || "No description available";
    const { status, warna } = getStockStatus(clusterStocks.total, min_stock);

    // Handle detail Material
    const handleDetailMaterial= (id) => {
        navigate(`/material/${id}`); // Navigasi ke halaman Material
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="mb-3 me-2 btn btn-danger">
                <FaArrowLeft /> Back
            </button>
            <button onClick={(e) => handleEditWarehouse(e, clusterStocks.id)} className="mb-3 btn btn-primary">
                Edit <FaArrowRight />
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Detail Data Barang Cluster Stock</h3>
                <form className='row'>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">ID Cluster</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input className="form-control" type="text" value={clusterStocks.id_cluster} readOnly />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Total Site</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input className="form-control" type="text" value={clusterStocks.total_site} readOnly />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">SAP Code Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <input className="form-control" type="text" value={clusterStocks.sap_code} readOnly />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Nama Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input className="form-control" type="text" value={name} readOnly />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">
                            Total Barang 
                            <span className={`ms-2 badge bg-${warna}`}>{status}</span>
                        </h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input className="form-control" type="number" value={clusterStocks.total} readOnly />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Minimal Stock Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input className="form-control" type="number" value={min_stock} readOnly />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className="text-start">Deskripsi</h6>
                        <textarea className="form-control" rows="3" value={description} readOnly />
                    </div>

                </form>
                
                <h3 className="mb-4">Material {name}</h3>
                <div className="table-container">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th className='text-center'>No.</th>
                            <th className='text-center'>SN Code</th>
                            <th className='text-center'>SAP Code</th>
                            <th className='text-center'>Nama Barang</th>
                            <th className='text-center'>Status Barang</th>
                            <th className='text-center'>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((material, index) => (
                            <tr key={material.id}>
                                <td>{index + 1}</td>
                                <td>{material.sn_code}</td>
                                <td>{material.sap_code}</td>
                                <td>{getItemName(material.sap_code)}</td>
                                <td>
                                    <span className={`badge ${material.status === 'new' ? 'bg-success' : 'bg-danger'} text-capitalize`}>
                                    {material.status}
                                    </span>
                                </td>
                                <td>
                                    <button className='btn' onClick={() => handleDetailMaterial(material.id)}><FaEye></FaEye></button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="6" className="text-center">No data found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClusterStockDetail;
