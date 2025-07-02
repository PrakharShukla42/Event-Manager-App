const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    category: {
        type: String,
        enum: ['conference', 'meeting', 'party', 'wedding', 'webinar'],
        default: 'meeting'
    },
    attendees: {
        type: [String], 
        default: []
    },
    maybe: {
        type: [String],
        default: []
    },
    declined: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
