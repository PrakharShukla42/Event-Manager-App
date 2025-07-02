import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-title">🎉 Event Manager</div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Event</Link>
                <Link to="/events">View Events</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/signin">Signin</Link>
            </div>
        </nav>
    );
}
