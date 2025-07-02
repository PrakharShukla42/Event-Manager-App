const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/EventManager')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Event Management System API');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
