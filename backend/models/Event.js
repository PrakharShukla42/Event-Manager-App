const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 5, maxlength: 100 },
    description: { type: String, required: true, minlength: 10, maxlength: 1000 },
    location: { type: String, required: true, minlength: 5, maxlength: 150 },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    category: {
        type: String,
        enum: ['conference', 'meeting', 'party', 'wedding', 'webinar'],
        default: 'meeting'
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approved: { type: Boolean, default: false },
    rsvps: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            status: { type: String, enum: ['attending', 'maybe', 'declined'] }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
