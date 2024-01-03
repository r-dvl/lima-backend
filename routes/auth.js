/**
 * This module provides the authentication endpoints.
 * @module authRouter
 */

// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');

// Create Express router
const authRouter = express.Router();

/**
 * Endpoint for user registration.
 * @name post/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Unique username check
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User register success.' });

    } catch (error) {
        res.status(500).json({ error: 'Error in registration.' });
    }
});

/**
 * Endpoint for user login.
 * @name post/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

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

/**
 * Endpoint to generate a token with undefined expiration.
 * @name post/token
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authRouter.post('/token', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret_key', {});

        const newToken = new Token({
            username,
            token,
        });

        await newToken.save();

        res.status(201).json({ message: 'Token creation success.' });

    } catch (error) {
        res.status(500).json({ error: 'Error in token creation.' });
    }
});

// Export the router
module.exports = authRouter;
