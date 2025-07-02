import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

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

            // Optionally auto-login on signup
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('userId', res.data.user._id);

            alert('Signup successful!');
            navigate('/');
        } catch (err) {
            alert('Signup failed. Try again.');
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>
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
    );
}
