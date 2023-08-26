const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authRouter = express.Router();

// User register
authRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Unique e-mail check
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        // Unique username check
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User register success.' });

    } catch (error) {
        res.status(500).json({ error: 'Error in registration.' });
    }
});

// User Login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login error' });
    }
});

module.exports = authRouter;
