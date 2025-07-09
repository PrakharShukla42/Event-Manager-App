import { useEffect, useState } from 'react';
import API from '../api/api';

export default function RSVPAdminDashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get('/events/rsvp-summary');
        setSummary(res.data);
      } catch (err) {
        alert('Could not load RSVP summary');
      }
    };
    fetch();
  }, []);

  return (
    <div className="container main-content">
      <h2>RSVP Summary</h2>
      {summary.map((event, idx) => (
        <div key={idx} className="event-card">
          <h3>{event.title} - by {event.creator}</h3>
          <p><strong>Attending:</strong> {event.attendees.join(', ') || 'None'}</p>
          <p><strong>Maybe:</strong> {event.maybe.join(', ') || 'None'}</p>
          <p><strong>Declined:</strong> {event.declined.join(', ') || 'None'}</p>
        </div>
      ))}
    </div>
  );
}
