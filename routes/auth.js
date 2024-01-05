/**
 * This module provides the authentication endpoints.
 * @module authRouter
 */

// Import necessary modules
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Token from '../models/Token.js';

// Create Express router
const authRouter = express.Router();

/**
 * Endpoint for user registration.
 * @route POST /register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
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
 * @route POST /login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
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
 * @route POST /token
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
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
export default authRouter;