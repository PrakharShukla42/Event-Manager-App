import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to Event Manager</h1>
            <Link to="/create">Create New Event</Link>
        </div>
    );
}
