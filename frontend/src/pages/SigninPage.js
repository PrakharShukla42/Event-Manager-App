import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import './Auth.css';

export default function SigninPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/signin', formData);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('userId', res.data.user._id);
            window.dispatchEvent(new Event('authChanged'));
            alert('Signin successful!');
            navigate('/');
        } catch (err) {
            alert('Signin failed. Try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <img className="auth-image" src="https://www.gla.ac.in/icmme2023/DATA/logo/gla.jpeg" alt="GLA Logo" />
                <h2>Welcome Back!</h2>
                <p>Signin to GLA University’s Event Portal to access and manage your events efficiently.</p>
            </div>
            <div className="auth-right">
                <div className="auth-form">
                    <h2>Signin</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        <button type="submit">Signin</button>
                    </form>
                    <p className="auth-link">
                        New user? <Link to="/signup">Signup here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
