import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import { FaArrowLeft, FaBox, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { getInventory, postInventory, postWarehouse } from '../api/axios';
=======
import { FaArrowLeft, FaBox, FaClipboardList } from 'react-icons/fa';
import { getInventory, getWarehouse, postWarehouse } from '../api/axios';
>>>>>>> 45558cc (initial commit)
import Swal from 'sweetalert2';

const InputWarehouse = () => {
    const [inventorys, setInventory] = useState([]);
<<<<<<< HEAD
=======
    const [registeredSapCodes, setRegisteredSapCodes] = useState([]); // SAP Code yang sudah terdaftar
>>>>>>> 45558cc (initial commit)
    const [sapCode, setSapCode] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');
    
<<<<<<< HEAD
    const navigate = useNavigate(); // Hook untuk navigasi
    
    useEffect(() => {
    getInventory((data) => {
        setInventory(data);
    });
    }, []);

=======
    const navigate = useNavigate(); 
    
    useEffect(() => {
        // Ambil data inventory
        getInventory((data) => {
            setInventory(data);
        });

        // Ambil daftar SAP Code yang sudah ada di warehouse
        getWarehouse((data) => {
            const sapCodes = data.map(item => item.sap_code); // Ambil hanya sap_code
            setRegisteredSapCodes(sapCodes);
        });
    }, []);
>>>>>>> 45558cc (initial commit)

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

<<<<<<< HEAD
        // Basic validation
        if (!stock) {
=======
        if (!sapCode || !stock) {
>>>>>>> 45558cc (initial commit)
            setError('All fields are required.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
<<<<<<< HEAD
        const user = auth.username

        // Prepare data payload
        const payload = {
            sap_code: sapCode,
            total_barang: parseInt(stock),
=======
        const user = auth.username;

        const payload = {
            sap_code: sapCode,
            min_stock: parseInt(stock),
>>>>>>> 45558cc (initial commit)
            status_barang: "baru",
            user,
        };

<<<<<<< HEAD
        // Kirim data ke server
        postWarehouse(payload, (data) => {

            // Navigasi ke halaman success setelah submit berhasil
=======
        postWarehouse(payload, () => {
>>>>>>> 45558cc (initial commit)
            Swal.fire({
                title: "Success!",
                text: "The item has been created successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
<<<<<<< HEAD
                navigate('/warehouse'); // Navigasi setelah alert selesai
=======
                navigate('/warehouse');
>>>>>>> 45558cc (initial commit)
            });
        });
    };

    const handleBack = () => {
<<<<<<< HEAD
        navigate('/warehouse')
    }
=======
        navigate('/warehouse');
    };
>>>>>>> 45558cc (initial commit)

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
<<<<<<< HEAD
                                    .filter(item => item.status === "show") // Hanya menampilkan data dengan status "show"
=======
                                    .filter(item => item.status === "show" && !registeredSapCodes.includes(item.sap_code) && item.status_data === "public") // Hanya yang belum terdaftar
>>>>>>> 45558cc (initial commit)
                                    .map((item) => (
                                        <option key={item.id} value={item.sap_code}>
                                            {item.sap_code} - {item.name}
                                        </option>
                                    ))}
                            </select>
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
=======
                                placeholder="Minimal Stock Barang"
>>>>>>> 45558cc (initial commit)
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                    </div>
<<<<<<< HEAD
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
=======
>>>>>>> 45558cc (initial commit)
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button className="mt-3 btn btn-primary" type="submit">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default InputWarehouse;
=======
export default InputWarehouse;
>>>>>>> 45558cc (initial commit)
