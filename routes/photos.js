const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// API Routes
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        const photoResponses = photos.map(photo => {
            return {
                id: photo._id,
                date: photo.date,
                image: photo.image,
            };
        });
        res.json(photoResponses);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:photoId', async (req, res) => {
    const photoId = req.params.photoId;

    try {
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.set('Content-Type', 'photo/jpg');
        res.send(photo.image);
    } catch (error) {
        console.error('Error fetching photo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;