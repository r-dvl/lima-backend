const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// API Routes
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        const formattedPhotos = photos.map(photo => ({
            date: photo.date.toString(),
            image: photo.image
        }));
        res.json(formattedPhotos);
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining photos from server' });
    }
});

module.exports = router;