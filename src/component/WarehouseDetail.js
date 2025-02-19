import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { FaArrowLeft, FaBox, FaClipboardList, FaEdit } from 'react-icons/fa';
import { getInventory, getWarehouseById } from '../api/axios';
=======
import { FaArrowLeft, FaArrowRight, FaBox, FaClipboardList, FaEye } from 'react-icons/fa';
import { getInventory, getMaterial, getWarehouseById } from '../api/axios';
>>>>>>> 45558cc (initial commit)

const WarehouseDetail = () => {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState(null);
    const [inventorys, setInventory] = useState([]);
<<<<<<< HEAD
=======
    const [materials, setMaterials] = useState([]);
>>>>>>> 45558cc (initial commit)
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
        getInventory((data) => {
            setInventory(data);
        });
=======
        getInventory(setInventory);
        getMaterial(setMaterials)
>>>>>>> 45558cc (initial commit)
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
<<<<<<< HEAD
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
    
    useEffect(() => {
        if (warehouse) {
            setWarehouse((prev) => ({
                ...prev,
                status_barang: prev.status_barang === "baru" ? "Baru" : "Bekas"
            }));
        }
    }, [warehouse]);    
=======
        console.log(total_barang, min_stock)
        if (total_barang === 0) {
            return { status: "Kosong", warna: "danger" }
        } 
        else if (total_barang <= min_stock) {
            return { status: "Butuh Restock", warna: "warning" }
        }
        else{
            return { status: "Ada", warna: "success" }; 
        }
    };

    const getItemName = (sap_code) => {
        const item = inventorys.find(i => i.sap_code === sap_code);
        return item ? item.name : 'Unknown';
    };
>>>>>>> 45558cc (initial commit)

    if (!warehouse) {
        return <div className="container mt-5">Memuat data...</div>;
    }

<<<<<<< HEAD
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
=======
    const filteredData = materials.filter((material) => material.id_location === warehouse.id_warehouse && material.sap_code === warehouse.sap_code).sort((a,b) => a.sn_code.localeCompare(b.sn_code));
    const matchedInventory = inventorys.find((inventory) => inventory.sap_code === warehouse.sap_code);
    const name = matchedInventory?.name || "Unknown Item"; 
    const description = matchedInventory?.description || "No description available";
    const { status, warna } = getStockStatus(filteredData.length, warehouse.min_stock);

    // Handle detail Material
    const handleDetailMaterial= (id) => {
        navigate(`/material/${id}`); // Navigasi ke halaman Material
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="mb-3 me-2 btn btn-danger">
                <FaArrowLeft /> Back
            </button>
            <button onClick={(e) => handleEditWarehouse(e, warehouse.id)} className="mb-3 btn btn-primary">
                Edit <FaArrowRight />
            </button>
>>>>>>> 45558cc (initial commit)
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Detail Data Barang Warehouse</h3>
                <form className='row'>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">SAP Code Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
<<<<<<< HEAD
                            <input
                                className="form-control"
                                placeholder="SAP Code"
                                type="text"
                                name="sap_code"
                                value={warehouse.sap_code}
                                readOnly
                            />
=======
                            <input className="form-control" type="text" value={warehouse.sap_code} readOnly />
>>>>>>> 45558cc (initial commit)
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Nama Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
<<<<<<< HEAD
                            <input
                                className="form-control"
                                placeholder="Nama Barang"
                                type="text"
                                name="name"
                                value={name}
                                readOnly
                            />
=======
                            <input className="form-control" type="text" value={name} readOnly />
>>>>>>> 45558cc (initial commit)
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">
                            Total Barang 
                            <span className={`ms-2 badge bg-${warna}`}>{status}</span>
                        </h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
<<<<<<< HEAD
                            <input
                                className="form-control"
                                placeholder="Total Barang"
                                type="number"
                                name="total_barang"
                                value={warehouse.total_barang}
                                readOnly
                            />
=======
                            <input className="form-control" type="number" value={filteredData.length} readOnly />
>>>>>>> 45558cc (initial commit)
                        </div>
                    </div>
                    <div className="mb-3 form-group col-md-6 col-sm-12">
                        <h6 className="text-start">Minimal Stock Barang</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaBox /></span>
<<<<<<< HEAD
                            <input
                                className="form-control"
                                placeholder="Min Stock"
                                type="number"
                                value={min_stock}
                                readOnly
                            />
=======
                            <input className="form-control" type="number" value={warehouse.min_stock} readOnly />
>>>>>>> 45558cc (initial commit)
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className="text-start">Deskripsi</h6>
<<<<<<< HEAD
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
                        <FaEdit /> Edit Page
                    </button>
                </form>
=======
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
                            <th className='text-center'>Kondisi Barang</th>
                            <th className='text-center'>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {console.log(filteredData)}
                        {filteredData.length > 0 ? (
                            filteredData.map((material, index) => (
                            <tr key={material.id}>
                                <td>{index + 1}</td>
                                <td>{material.sn_code}</td>
                                <td>{material.sap_code}</td>
                                <td>{getItemName(material.sap_code)}</td>
                                <td>
                                    <span className={`badge ${material.status_barang === 'new' ? 'bg-success' : 'bg-danger'} text-capitalize`}>
                                    {material.status_barang}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${material.kondisi_barang === 'good' ? 'bg-success' : 'bg-danger'} text-capitalize`}>
                                    {material.kondisi_barang}
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
>>>>>>> 45558cc (initial commit)
            </div>
        </div>
    );
};

export default WarehouseDetail;
