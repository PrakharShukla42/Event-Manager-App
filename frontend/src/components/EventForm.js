// components/EventForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function EventForm() {
    const [formData, setFormData] = useState({
        title: '', description: '', location: '', date: '', time: '', category: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/events/create', formData);
            alert("Event created successfully!");
            navigate('/myevents'); 
        } catch (err) {
            console.error("Event creation failed", err);
            alert("Failed to create event");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="date" name="date" onChange={handleChange} required />
            <input type="time" name="time" onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <button type="submit">Create Event</button>
        </form>
    );
}
