const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// ✅ Session Setup
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: DB_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// ✅ Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// ✅ Debug Middleware (optional)
app.use((req, res, next) => {
    console.log('🔐 SESSION:', req.session);
    console.log('👤 USER:', req.user);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('🎉 GLA Event Manager Backend is Running!');
});

mongoose.connect(DB_URL)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Failed:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
