import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/signup', formData);

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('userId', res.data.user._id);

            window.dispatchEvent(new Event('authChanged'));
            alert('Signup successful!');
            navigate('/');
        } catch (err) {
            alert('Signup failed. Try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                                <h2>Welcome to GLA University</h2>
                <p>
                    Join the official GLA Event Portal to create, explore, and manage events within our vibrant campus!
                </p>
                <img
                    src="https://www.gla.ac.in/icmme2023/DATA/logo/gla.jpeg"
                    alt="GLA Campus Signup"
                    className="auth-image"
                />
            </div>

            <div className="auth-form auth-right">
                <h2>Signup for GLA Event Portal</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}
