import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function CreateEventPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        category: 'meeting'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/events/create', formData);
            alert('Event created successfully!');
            navigate('/myevents');
        } catch (err) {
            alert('Failed to create event');
        }
    };

    return (
        <div className="container">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input name="date" type="date" value={formData.date} onChange={handleChange} required />
                <input name="time" type="time" value={formData.time} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="conference">Conference</option>
                    <option value="meeting">Meeting</option>
                    <option value="party">Party</option>
                    <option value="wedding">Wedding</option>
                    <option value="webinar">Webinar</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
