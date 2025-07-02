import { Link } from 'react-router-dom';

export default function HomePage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <div className="hero">
            <img
                src="https://www.gla.ac.in/icmme2023/DATA/logo/gla.jpeg"
                alt="GLA University Logo"
                className="hero-logo"
            />
            <h1>GLA University Event Manager</h1>
            <p className="motto">“ऋते ज्ञानान्न मुक्ति”</p>

            {!isLoggedIn && (
                <div className="hero-links">
                    <Link to="/signin" className="hero-btn">Signin to Continue</Link>
                    <Link to="/signup" className="hero-btn">Signup</Link>
                </div>
            )}

            {isLoggedIn && (
                <div className="hero-links">
                    <Link to="/create" className="hero-btn">Create Event</Link>
                    <Link to="/events" className="hero-btn">View Events</Link>
                </div>
            )}
        </div>
    );
}
