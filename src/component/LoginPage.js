//login
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Ensure this path is correct
import { FaUser , FaLock } from 'react-icons/fa'; // Importing icons from react-icons

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }
        setLoading(true);
        // Simulate a login request
        setTimeout(() => {
            console.log('Logging in with:', { email, password });
            setLoading(false);
            // Reset fields or redirect after successful login
        }, 2000);
    };

    return (
        <div className="bg-primary vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="login-form bg-white p-4 rounded shadow">
                    <div className="text-center">
                    <img src="Asset 1.png" alt="My Image" style={{ width: "100%", maxWidth: "400px", height: "auto" }} />
                    </div>
                    <h2 className="text-center mb-3"></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="username">Username</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaUser  /></span>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaLock /></span>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button className="btn btn-primary rounded w-100" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;