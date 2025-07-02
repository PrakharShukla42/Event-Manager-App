const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/create', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

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
