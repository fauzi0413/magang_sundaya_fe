import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaClipboardList, FaEdit } from 'react-icons/fa';
import { getInventory, getWarehouseById } from '../api/axios';

const ClusterDetail = () => {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState(null);
    const [inventorys, setInventory] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getInventory((data) => {
            setInventory(data);
        });
    }, []);

    useEffect(() => {
        getWarehouseById(id, (data) => {
            setWarehouse(data);
        }, () => {
            setError('Gagal mengambil data warehouse');
        });
    }, [id]);

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
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <input
                                className="form-control"
                                placeholder="SAP Code"
                                type="text"
                                name="sap_code"
                                value={warehouse.sap_code}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Nama Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Nama Barang"
                                type="text"
                                name="name"
                                value={name}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">
                            Total Barang 
                            <span className={`ms-2 badge bg-${warna}`}>{status}</span>
                        </h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Total Barang"
                                type="number"
                                name="total_barang"
                                value={warehouse.total_barang}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Minimal Stock Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
                            <input
                                className="form-control"
                                placeholder="Min Stock"
                                type="number"
                                value={min_stock}
                                readOnly
                            />
                        </div>
                    </div>
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
            </div>
        </div>
    );
};

export default ClusterDetail;
