import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/signin', { email, password });

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('role', res.data.user.role);
            window.dispatchEvent(new Event('authChanged'));

            alert(`Welcome back, ${res.data.user.username}`);
            navigate('/');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Signin</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Signin</button>
            </form>
        </div>
    );
}
