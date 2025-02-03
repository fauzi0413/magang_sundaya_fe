import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaHashtag, FaMapMarkedAlt, FaMapPin, FaPhoneAlt, FaUserTie, FaWarehouse } from 'react-icons/fa';
import { postCluster } from '../api/axios';
import Swal from 'sweetalert2';

const InputCluster = () => {
    const [idCluster, setIdCluster] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kabKota, setkabKota] = useState('');
    const [centerPoint, setCenterPoint] = useState('');
    const [pic, setPic] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook untuk navigasi

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!idCluster || !provinsi || !kabKota || !centerPoint || !centerPoint || !pic || !contact) {
            setError('All fields are required.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth.username

        // Prepare data payload
        const payload = {
            id_cluster: idCluster,
            provinsi: provinsi,
            kabupaten_kota: kabKota,
            center_point: centerPoint,
            pic: pic,
            contact: contact,
            user,
        };

        // Kirim data ke server
        postCluster(payload, (data) => {

            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been created successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/cluster'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/cluster')
    }

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'><FaArrowLeft/> Back</button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Tambah Data Cluster</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>ID Cluster</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaHashtag /></span>
                            <input
                                className="form-control"
                                placeholder="ID cluster"
                                type="text"
                                value={idCluster}
                                onChange={(e) => setIdCluster(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Provinsi</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaWarehouse /></span>
                            <input
                                className="form-control"
                                placeholder="Provinsi cluster"
                                type="text"
                                value={provinsi}
                                onChange={(e) => setProvinsi(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Kabupaten/Kota</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaMapMarkedAlt /></span>
                            <input
                                className="form-control"
                                placeholder="Kabupaten atau Kota Cluster"
                                type="text"
                                value={kabKota}
                                onChange={(e) => setkabKota(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Center Point</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaMapPin /></span>
                            <input
                                className="form-control"
                                placeholder="Center Point"
                                type="text"
                                value={centerPoint}
                                onChange={(e) => setCenterPoint(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>PIC</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserTie /></span>
                            <input
                                className="form-control"
                                placeholder="Person In Charge Cluster"
                                type="text"
                                value={pic}
                                onChange={(e) => setPic(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Contact</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaPhoneAlt /></span>
                            <input
                                className="form-control"
                                placeholder="Contact"
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
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

export default InputCluster;