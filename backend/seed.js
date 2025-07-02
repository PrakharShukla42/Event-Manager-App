const mongoose = require('mongoose');
const Event = require('./models/Event');

mongoose.connect('mongodb://127.0.0.1:27017/EventManager')
    .then(() => {
        console.log('MongoDB connected');
        return seedEvents();
    })
    .catch(err => console.error('MongoDB connection error:', err));

async function seedEvents() {
    const events = [
        {
            title: "Tech Conference 2025",
            description: "An annual event focusing on emerging technologies in AI and IoT.",
            location: "Bangalore Convention Centre",
            date: new Date('2025-08-20'),
            time: "10:00",
            category: "conference"
        },
        {
            title: "Startup Meetup",
            description: "A gathering for budding entrepreneurs to network and share ideas.",
            location: "Delhi Startup Hub",
            date: new Date('2025-08-25'),
            time: "14:30",
            category: "meeting"
        },
        {
            title: "Wedding of Rahul & Priya",
            description: "A beautiful wedding ceremony with friends and family.",
            location: "The Royal Palace, Jaipur",
            date: new Date('2025-09-05'),
            time: "17:00",
            category: "wedding"
        },
        {
            title: "Online React Webinar",
            description: "A beginner-friendly webinar covering React fundamentals.",
            location: "Zoom Call",
            date: new Date('2025-07-15'),
            time: "19:00",
            category: "webinar"
        },
        {
            title: "Birthday Bash",
            description: "A surprise birthday party with games, food, and fun!",
            location: "Sector 62, Noida",
            date: new Date('2025-08-12'),
            time: "20:00",
            category: "party"
        }
    ];

    try {
        await Event.deleteMany();
        const result = await Event.insertMany(events);
        console.log(`Inserted ${result.length} events successfully.`);
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        mongoose.disconnect();
    }
}
