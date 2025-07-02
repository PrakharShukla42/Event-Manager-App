import { useEffect, useState } from 'react';
import API from '../api/api';
import './AllEventsPage.css'; // Optional: for scoped styles

export default function AllEventsPage() {
    const [events, setEvents] = useState([]);
    const isAdmin = localStorage.getItem('role') === 'admin';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get('/events');
                const filteredEvents = res.data.filter(event => event.title && event.description);
                setEvents(filteredEvents);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await API.delete(`/events/${eventId}`);
                setEvents(events.filter(event => event._id !== eventId));
            } catch (err) {
                alert('Failed to delete event.');
            }
        }
    };

    return (
        <div className="main-content">
            <h2>All Events</h2>
            {events.map((event, idx) => (
                <div key={idx} className="event-card">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Created by:</strong> {event.creatorName || 'N/A'}</p>
                    {isAdmin && (
                        <button className="delete-button" onClick={() => handleDelete(event._id)}>
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
