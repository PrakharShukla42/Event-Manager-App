const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'User not found' });

                const match = await bcrypt.compare(password, user.password);
                if (!match) return done(null, false, { message: 'Incorrect password' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: 'Not authenticated' });
};

exports.ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') return next();
    res.status(403).json({ error: 'Admins only' });
};
