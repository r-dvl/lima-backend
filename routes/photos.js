const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

// API Routes
// Get all
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

// Get by id
router.get('/:id', async (req, res) => {
    const photoId = req.params.id;

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

// Get by date
router.get('/date/:date', async (req, res) => {
    const requestedDate = new Date(req.params.date);

    const nextDay = new Date(requestedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    try {
        const photos = await Photo.find({
            date: {
                $gte: requestedDate,
                $lt: nextDay,
            },
        }).exec();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ error: 'Error obtaining photos' });
    }
});

// Delete by date (Day deleted)
router.delete('/date/:date', async (req, res) => {
    const requestedDate = new Date(req.params.date);

    try {
        const result = await Photo.deleteMany({
            date: {
                $gte: requestedDate,
                $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000), // Next day
            },
        }).exec();

        res.json({ message: `${result.deletedCount} photos deleted` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting photos' });
    }
});

// Post photo
router.post('/upload', async (req, res) => {
    try {
        const { date, image } = req.body;

        const newPhoto = new Photo({
            date: new Date(date),
            image: image,
        });

        await newPhoto.save();
        res.json({ message: 'Photo uploaded' });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

module.exports = router;