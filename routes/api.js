const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// API Routes
router.get('/photos', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining photos from server' });
    }
});

module.exports = router;