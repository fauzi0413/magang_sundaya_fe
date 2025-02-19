import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaUserAlt, FaClipboardList, FaUserLock } from 'react-icons/fa';
import { getUserById, putUser } from '../api/axios';
import Swal from 'sweetalert2';

const EditUser = () => {
    const { id } = useParams(); // Menangkap ID dari URL
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);

    // Mengambil data user berdasarkan ID saat komponen dimuat
    useEffect(() => {
        getUserById(id, (data) => {
            setUser(data);
        });
    }, [id]);

    // Mengubah nilai dalam form
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Fungsi untuk submit perubahan
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Validasi password
        if (!user.password) {
            setError('Password harus diisi.');
            return;
        }

        const auth = JSON.parse(localStorage.getItem("auth"));
        const authUser = auth ? auth.username : 'Unknown';

        // Persiapan data yang akan diupdate
        const payload = {
            password: user.password,
            role: user.role,
        };

        // Kirim data update ke server
        putUser(id, payload, (data) => {
            Swal.fire({
                title: "Success!",
                text: "User data has been updated successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/user'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/user');
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'>
                <FaArrowLeft /> Back
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Edit Data User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Username</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserAlt /></span>
                            <input
                                className="form-control"
                                placeholder="Username"
                                type="text"
                                name="username"
                                value={user.username}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Password</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserLock /></span>
                            <input
                                className="form-control"
                                placeholder="Password"
                                type="text"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Role User</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaClipboardList /></span>
                            <select
                                className="form-control"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >
<<<<<<< HEAD
                                {/* <option value="">Pilih Role</option> */}
                                <option value="admin">Admin</option>
                                <option value="management">Management</option>
=======
                            <option value="noc">Admin NOC</option>
                            <option value="om">Admin OM</option>
                            <option value="management">Management</option>
>>>>>>> 45558cc (initial commit)
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

export default EditUser;
