import { useEffect, useState } from 'react';
import API from '../api/api';
import './MyEventsPage.css';

export default function MyEventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchMyEvents = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return alert("Please log in");

            try {
                const res = await API.get(`/events/myevents/${userId}`);
                setEvents(res.data);
            } catch (err) {
                alert('Failed to load your events');
            }
        };

        fetchMyEvents();
    }, []);

    return (
        <div className="my-events-container">
            <h2>My Events</h2>
            <div className="card-grid">
                {events.map(event => (
                    <div key={event._id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                        <p><strong>Category:</strong> {event.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
