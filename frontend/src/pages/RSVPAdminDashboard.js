// src/pages/RSVPAdminDashboard.js
import { useEffect, useState } from 'react';
import API from '../api/api';

export default function RSVPAdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await API.get('/events/admin/all');
        setEvents(res.data);
      } catch (err) {
        alert('Failed to fetch events');
      }
    };
    fetchAllEvents();
  }, []);

  const handleApprove = async (id) => {
    try {
      await API.post(`/events/approve/${id}`);
      setEvents(events.map(ev => ev._id === id ? { ...ev, approved: true } : ev));
    } catch (err) {
      alert('Failed to approve event');
    }
  };

  return (
    <div className="container">
      <h2>Admin RSVP Dashboard</h2>

      {events.map(event => (
        <div key={event._id} className="event-card">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Created By:</strong> {event.creator?.username} ({event.creator?.email})</p>
          <p><strong>Status:</strong> {event.approved ? '✅ Approved' : '⏳ Pending'}</p>

          {!event.approved && (
            <button className="hero-btn" onClick={() => handleApprove(event._id)}>
              ✅ Approve Event
            </button>
          )}

          {event.rsvps && event.rsvps.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <strong>RSVP Summary:</strong>
              <ul>
                {event.rsvps.map((r, idx) => (
                  <li key={idx}>
                    {r.userId?.username || 'Unknown'} - {r.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
