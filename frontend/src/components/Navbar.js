import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import API from '../api/api';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    const updateAuth = () => {
        const status = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(status);
        setRole(status ? localStorage.getItem('role') : null);
    };

    useEffect(() => {
        updateAuth();
        window.addEventListener('storage', updateAuth);
        window.addEventListener('authChanged', updateAuth);
        return () => {
            window.removeEventListener('storage', updateAuth);
            window.removeEventListener('authChanged', updateAuth);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await API.get('/auth/logout');
            localStorage.clear();
            window.dispatchEvent(new Event('authChanged'));
            alert('Logged out!');
            navigate('/signin');
        } catch (err) {
            alert('Logout failed');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">
                <img
                    src="https://www.gla.ac.in/icmme2023/DATA/logo/gla.jpeg"
                    alt="GLA University Logo"
                    style={{
                        height: '45px',
                        verticalAlign: 'middle',
                        borderRadius: '8px',
                        marginRight: '12px',
                    }}
                />
                GLA Event Manager
            </div>

            <div className="navbar-links">
                <Link to="/">Home</Link>

                {isLoggedIn && role === 'admin' && (
                    <>
                        <Link to="/create">Create Event</Link>
                        <Link to="/events">All Events</Link>
                        <Link to="/admin/rsvp-summary">RSVP Summary</Link>
                    </>
                )}

                {isLoggedIn && role === 'user' && (
                    <>
                        <Link to="/create">Create Event</Link>
                        <Link to="/myevents">My Events</Link>
                    </>
                )}

                {!isLoggedIn && <Link to="/signin">Signin</Link>}
                {!isLoggedIn && <Link to="/signup">Signup</Link>}

                {isLoggedIn && (
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
