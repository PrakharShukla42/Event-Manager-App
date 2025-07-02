import { useEffect, useState } from 'react';
import API from '../api/api';

export default function AllEventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get('/events');
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="container">
            <h2>All Events</h2>
            {events.map((event, idx) => (
                <div key={idx} className="event-card">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                </div>
            ))}
        </div>
    );
}
