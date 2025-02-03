import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaUserAlt, FaUserFriends, FaUserLock } from 'react-icons/fa';
import { getUsers, postUser } from '../api/axios';
import Swal from 'sweetalert2';

const InputUser = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook untuk navigasi

    
    useEffect(() => {
    getUsers((data) => {
        setUsers(data);
    });
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Basic validation
        if (!username || !password || !role) {
            setError('All fields are required.');
            return;
        }
        
        // Cek apakah username sudah ada dalam database
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            setError('Username is already taken.');
            return;
        }

        // Prepare data payload
        const payload = {
            username: username,
            password: password,
            role: role
        };

        // Kirim data ke server
        postUser(payload, (data) => {
            // Navigasi ke halaman success setelah submit berhasil
            Swal.fire({
                title: "Success!",
                text: "The item has been created successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/user'); // Navigasi setelah alert selesai
            });
        });
    };

    const handleBack = () => {
        navigate('/user')
    }

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className='mb-3 btn btn-danger'><FaArrowLeft/> Back</button>
            <div className="p-4 text-center shadow card">
                <h3 className="mb-4">Tambah Data User</h3>
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <h6 className='text-start'>Role User</h6>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserFriends /></span>
                            <select
                                className="form-control"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="management">Management</option>
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

export default InputUser;