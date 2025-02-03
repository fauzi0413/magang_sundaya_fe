import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaHashtag, FaMapMarkedAlt, FaMapPin, FaPhoneAlt, FaUserTie, FaWarehouse } from 'react-icons/fa';
import { getClusterById, getInventoryById, putCluster, putInventory } from '../api/axios';
import Swal from 'sweetalert2';

const EditCluster = () => {
    const { id } = useParams(); // Menangkap ID dari URL
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [cluster, setCluster] = useState([]);

    // Mengambil data inventory berdasarkan ID saat komponen dimuat
    useEffect(() => {
        getClusterById(id, (data) => {
            setCluster(data);
        });
    }, [id]);

    // Mengubah nilai dalam form
    const handleChange = (e) => {
        setCluster({ ...cluster, [e.target.name]: e.target.value });
    };

    // Fungsi untuk submit perubahan
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!cluster) {
            setError('Semua kolom harus diisi.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const user = auth ? auth.username : 'Unknown';

        // Persiapan data yang akan diupdate
        const payload = {
            id_cluster: cluster.id_cluster,
            provinsi: cluster.provinsi,
            kabupaten_kota: cluster.kabupaten_kota,
            center_point: cluster.center_point,
            pic: cluster.pic,
            contact: cluster.contact,
            user,
        };

        // Kirim data update ke server
        putCluster(id, payload, (data) => {
            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been edit successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/cluster'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/cluster');
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'>
                <FaArrowLeft /> Back
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Edit Data Cluster</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>ID Cluster</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaHashtag /></span>
                            <input
                                className="form-control"
                                placeholder="ID cluster"
                                type="text"
                                name="id_cluster"
                                value={cluster.id_cluster}
                                onChange={handleChange}
                                disabled
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
                                name="provinsi"
                                value={cluster.provinsi}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                    <h6 className='text-start'>Kabuten/Kota</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaWarehouse /></span>
                            <input
                                className="form-control"
                                placeholder="Kabupaten atau kota cluster"
                                type="text"
                                name="kabupaten_kota"
                                value={cluster.kabupaten_kota}
                                onChange={handleChange}
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
                                name="center_point"
                                value={cluster.center_point}
                                onChange={handleChange}
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
                                name="pic"
                                value={cluster.pic}
                                onChange={handleChange}
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
                                name="contact"
                                value={cluster.contact}
                                onChange={handleChange}
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

export default EditCluster;