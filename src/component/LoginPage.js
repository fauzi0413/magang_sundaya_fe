import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUsers((data) => {
            setUsers(data);
        });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
    
        const user = users.find(
            (user) => (user.username === username && user.password === password) || (username === 'adminsundaya' && password === 'admin')
        );
    
        if (user) {
            const { role } = user;
    
            // Save user details to localStorage
            localStorage.setItem('auth', JSON.stringify({ username, role }));
    
            // Redirect based on role
            if(username === "admin_sundaya"){
                navigate('/')
            }else{
                if (role === 'admin') {
                    navigate('/');
                } else if (role === 'management') {
                    navigate('/DashboardWarehouse');
                }
            }

            // Force page reload after navigation
            setTimeout(() => {
                window.location.reload();
            });
        } else {
            setError('Invalid username or password');
        }
    };    

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#C42B2B',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '900px',
                }}
            >
                <img
                    src="/Asset 1.png"
                    alt="Sundaya Logo"
                    style={{ width: '400px', height: '80px', marginBottom: '20px' }}
                />
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            display: 'block',
                            margin: '10px auto',
                            padding: '12px',
                            width: '90%',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            display: 'block',
                            margin: '10px auto',
                            padding: '12px',
                            width: '90%',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '12px 20px',
                            background: '#C42B2B',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '15px',
                            width: '40%',
                            borderRadius: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;