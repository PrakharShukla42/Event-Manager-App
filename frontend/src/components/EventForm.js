import { useState } from 'react';
import API from '../api/api';

export default function EventForm() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        category: 'meeting'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const creator = localStorage.getItem('userId');
            await API.post('/events/create', { ...form, creator });
            alert('Event Created!');
            setForm({
                title: '',
                description: '',
                location: '',
                date: '',
                time: '',
                category: 'meeting'
            });
        } catch (err) {
            alert('Failed to create event');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Event Title" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange}>
                <option value="conference">Conference</option>
                <option value="meeting">Meeting</option>
                <option value="party">Party</option>
                <option value="wedding">Wedding</option>
                <option value="webinar">Webinar</option>
            </select>
            <button type="submit">Create Event</button>
        </form>
    );
}
