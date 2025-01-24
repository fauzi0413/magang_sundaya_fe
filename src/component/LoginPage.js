import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import sundayaLogo from './asset1.png';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'noc' && password === 'noc123') {
            navigate('/dashboard');
        } else if (username === 'om' && password === 'om123') {
            navigate('/sidebarOM');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: '#0066ff' 
        }}>
            <div style={{ 
                backgroundColor: 'white', 
                padding: '40px', 
                borderRadius: '10px', 
                textAlign: 'center', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                width: '900px' 
            }}>
                <img src="/Asset 1.png" alt="Sundaya Logo" style={{ width: '400px', height: '80px', marginBottom: '20px' }} />
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    style={{ display: 'block', margin: '10px auto', padding: '12px', width: '90%', borderRadius: '20px', border: '1px solid #ccc' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={{ display: 'block', margin: '10px auto', padding: '12px', width: '90%', borderRadius: '20px', border: '1px solid #ccc' }}
                />
                <button onClick={handleLogin} style={{ padding: '12px 20px', background: '#0066ff', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px', width: '40%', borderRadius: '20px', fontSize: '16px', fontWeight: 'bold' }}>
                    Login
                </button>
                {/* <p style={{ marginTop: '15px', fontSize: '14px', color: '#555' }}>
                    Don't have an account? <a href="#" style={{ color: '#0066ff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</a> */}
                {/* </p> */}
            </div>
        </div>
    );
};

export default LoginPage;
