// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// 🔥 Import passport config here
require('./config/passport')(passport); // Adjust the path if needed

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('🎉 Event Management System API');
});

mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
