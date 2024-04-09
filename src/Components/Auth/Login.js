import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            if (isRegistering) {
                await axios.post('http://localhost:8000/register', { username, password, email });
                setIsRegistering(false);
                alert('Registration successful. Please check your email for the authentication link.');
            } else {
                const response = await axios.post('http://localhost:8000/login', { username, password });
                const { access_token } = response.data;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('username', username);
                onLogin();
                navigate('/');
            }
        } catch (err) {
            setError(err.response ? err.response.data.detail : 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>{isRegistering ? 'Register' : 'Log in'}</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>
                    {isRegistering && (
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </div>
                    )}
                    <button type="submit" className="login-button">{isRegistering ? 'Register' : 'Log in'}</button>
                </form>
                <div className="toggle-form">
                    {isRegistering ? (
                        <span>Already have an account? <button onClick={() => setIsRegistering(false)}>Log in</button></span>
                    ) : (
                        <span>Don't have an account? <button onClick={() => setIsRegistering(true)}>Register</button></span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;