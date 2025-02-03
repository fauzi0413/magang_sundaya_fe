import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaBox, FaClipboardList, FaEdit, FaUserAlt, FaUserLock } from 'react-icons/fa';
import { getUserById } from '../api/axios';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Mengambil data user berdasarkan ID saat komponen dimuat
    useEffect(() => {
        getUserById(id, (data) => {
            setUser(data);
        });
    }, [id]);

    const handleBack = () => {
        navigate('/user');
    };

    const handleEditUser= (e, id) => {
        e.preventDefault();
        navigate(`/user/edit/${id}`);
    };

    if (!user) {
        return <div className="container mt-5">Memuat data...</div>;
    }

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="mb-3 btn btn-danger">
                <FaArrowLeft /> Back
            </button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Detail Data User</h3>
                <form>
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
                                disabled
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
                                disabled
                            >
                                {/* <option value="">Pilih Role</option> */}
                                <option value="admin">Admin</option>
                                <option value="management">Management</option>
                            </select>
                        </div>
                    </div>
                    
                    <button 
                        className="btn btn-primary"
                        onClick={(e) => handleEditUser(e, user.id)}
                    >
                        <FaEdit /> Edit Page
                    </button>
                </form>    
            </div>
        </div>
    );
};

export default UserDetail;
