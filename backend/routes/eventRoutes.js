const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { ensureAuthenticated, ensureAdmin } = require('../config/passport');


// ✅ Create Event (Pending approval if not admin)
router.post('/create', ensureAuthenticated, async (req, res) => {
    try {
        const { title, description, location, date, time, category } = req.body;

        const event = new Event({
            title,
            description,
            location,
            date,
            time,
            category,
            creator: req.user._id,
            approved: req.user.role === 'admin'
        });

        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Approve Event (Admin only)
router.post('/approve/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        event.approved = true;
        await event.save();

        res.json({ message: 'Event approved successfully', event });
    } catch (err) {
        res.status(500).json({ error: 'Approval failed' });
    }
});

// ✅ Get All Events (Admins see all, users see only approved)
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { approved: true };
        const events = await Event.find(query)
            .populate('creator', 'username email')
            .sort({ date: 1 });

        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get My Events (Only events created by current user)
router.get('/myevents', ensureAuthenticated, async (req, res) => {
    try {
        const events = await Event.find({ creator: req.user._id })
            .populate('rsvps.userId', 'username email')
            .sort({ date: 1 });

        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ RSVP to Event
router.post('/rsvp/:id', ensureAuthenticated, async (req, res) => {
    const { status } = req.body;
    const valid = ['attending', 'maybe', 'declined'];

    if (!valid.includes(status)) {
        return res.status(400).json({ error: 'Invalid RSVP option' });
    }

    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        // Remove previous RSVP if exists
        event.rsvps = event.rsvps.filter(
            r => r.userId.toString() !== req.user._id.toString()
        );

        event.rsvps.push({ userId: req.user._id, status });
        await event.save();

        res.json({ message: 'RSVP submitted', event });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get All Events for Admin RSVP Dashboard
router.get('/admin/all', ensureAuthenticated, ensureAdmin, async (req, res) => {
    try {
        const events = await Event.find({})
            .populate('creator', 'username email')
            .populate('rsvps.userId', 'username email')
            .sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ Delete Event (Admin or event creator)
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        if (
            req.user.role !== 'admin' &&
            event.creator.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ error: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
