// ✅ src/pages/AllEventsPage.js

import { useEffect, useState } from 'react';
import API from '../api/api';

export default function AllEventsPage() {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get('/events');
                setEvents(res.data);
            } catch (err) {
                alert('Failed to load events');
            }
        };

        setUserId(localStorage.getItem('userId'));
        setRole(localStorage.getItem('role'));
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await API.delete(`/events/${id}`);
            setEvents(events.filter((event) => event._id !== id));
        } catch (err) {
            alert('Failed to delete event');
        }
    };

    const handleApprove = async (id) => {
        try {
            await API.post(`/events/approve/${id}`);
            const updated = events.map((event) =>
                event._id === id ? { ...event, approved: true } : event
            );
            setEvents(updated);
            alert('Event approved!');
        } catch (err) {
            alert('Failed to approve event');
        }
    };

    const handleRSVP = async (id, status) => {
        try {
            await API.post(`/events/rsvp/${id}`, { status });
            const updated = events.map((ev) =>
                ev._id === id
                    ? {
                        ...ev,
                        rsvps: [
                            ...(ev.rsvps?.filter((r) => r.userId !== userId) || []),
                            { userId, status },
                        ],
                    }
                    : ev
            );
            setEvents(updated);
            setRsvpStatus({ ...rsvpStatus, [id]: status });
        } catch (err) {
            alert('Failed to RSVP');
        }
    };

    const getRSVP = (event) => {
        const entry = event.rsvps?.find((r) => r.userId === userId);
        return entry?.status || 'Not Responded';
    };

    return (
        <div className="container main-content">
            <h2>All Events</h2>
            {events.map((event) => (
                <div key={event._id} className="event-card">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-IN')}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Status:</strong> {event.approved ? '✅ Approved' : '⏳ Pending Approval'}</p>

                    {/* Admin Approval Button */}
                    {role === 'admin' && !event.approved && (
                        <button onClick={() => handleApprove(event._id)} className="hero-btn">
                            ✅ Approve
                        </button>
                    )}

                    {/* RSVP Status */}
                    {role === 'user' && event.approved && (
                        <>
                            <p><strong>Your RSVP:</strong> {getRSVP(event)}</p>
                            <button onClick={() => handleRSVP(event._id, 'attending')} className="hero-btn">✅ Attend</button>
                            <button onClick={() => handleRSVP(event._id, 'maybe')} className="hero-btn">🤔 Maybe</button>
                            <button onClick={() => handleRSVP(event._id, 'declined')} className="hero-btn">❌ Decline</button>
                        </>
                    )}

                    {/* Delete Button for Admin or Creator */}
                    {(role === 'admin' || event.creator?._id === userId) && (
                        <button onClick={() => handleDelete(event._id)} className="delete-button">
                            🗑️ Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
