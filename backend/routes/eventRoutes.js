const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// Create Event
router.post('/create', async (req, res) => {
    try {
        const { title, description, location, date, time, category, creator } = req.body;
        const newEvent = new Event({ title, description, location, date, time, category, creator });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Events (with creator info)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ date: 1 })
            .populate('creator', 'username email');
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Events by User
router.get('/myevents/:userId', async (req, res) => {
    try {
        const events = await Event.find({ creator: req.params.userId }).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// RSVP Handler
router.post('/rsvp/:id', async (req, res) => {
    const { email, status } = req.body;
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        event.attendees = event.attendees.filter(e => e !== email);
        event.maybe = event.maybe.filter(e => e !== email);
        event.declined = event.declined.filter(e => e !== email);

        if (status === 'attending') event.attendees.push(email);
        else if (status === 'maybe') event.maybe.push(email);
        else if (status === 'declined') event.declined.push(email);
        else return res.status(400).json({ error: 'Invalid status' });

        await event.save();
        res.json({ message: 'RSVP updated', event });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Event by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
