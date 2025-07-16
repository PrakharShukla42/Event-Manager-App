// src/pages/MyEventsPage.js
import { useEffect, useState } from 'react';
import API from '../api/api';

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await API.get('/events/myevents');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to load my events', err);
      }
    };
    fetchMyEvents();
  }, []);

  return (
    <div className="container">
      <h2>My Events</h2>

      {events.length === 0 && <p>You have not created any events yet.</p>}

      {events.map(event => (
        <div className="event-card" key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Status:</strong> {event.approved ? '✅ Approved' : '⏳ Pending'}</p>

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
