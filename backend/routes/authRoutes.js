const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Signed in', user: req.user });
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: 'Logged out successfully' });
  });
});


module.exports = router;
