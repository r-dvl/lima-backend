/**
 * This module provides the endpoints for the Cat Watcher app.
 * @module photosRouter
 */

// Import necessary modules
const express = require('express');
const photosRouter = express.Router();
const Photo = require('../models/Photo');
const authMiddleware = require('../middlewares/authMiddleware');

// Use authentication middleware
photosRouter.use(authMiddleware);

/**
 * Endpoint to post a photo.
 * @route POST /upload
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.post('/upload', async (req, res) => {
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

/**
 * Endpoint to get all photos.
 * @route GET /
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.get('/', async (req, res) => {
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
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * Endpoint to get a photo by id.
 * @route GET /:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.get('/:id', async (req, res) => {
    const photoId = req.params.id;

    try {
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.set('Content-Type', 'photo/jpg');
        res.send(photo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * Endpoint to get photos by date and page.
 * @route GET /date/:date/:page
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.get('/date/:date/:page', async (req, res) => {
    const requestedDate = new Date(req.params.date);
    const photosPerPage = 9;
    const currentPage = Number(req.params.page);

    const nextDay = new Date(requestedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    try {
        const photos = await Photo.find({
            date: {
                $gte: requestedDate,
                $lt: nextDay,
            },
        })
            .sort('-date')
            .skip((currentPage - 1) * photosPerPage)
            .limit(photosPerPage)
            .exec();

        res.json(photos);
    } catch (err) {
        res.status(500).json({ error: 'Error obtaining photos' });
    }
});

/**
 * Endpoint to get the count of photos by date.
 * @route GET /count/:date
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.get('/count/:date', async (req, res) => {
    const requestedDate = new Date(req.params.date);
    const nextDay = new Date(requestedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    try {
        const photoCount = await Photo.countDocuments({
            date: {
                $gte: requestedDate,
                $lt: nextDay,
            },
        });
        res.json({ count: photoCount });
    } catch (err) {
        res.status(500).json({ error: 'Error obtaining photo count' });
    }
});

/**
 * Endpoint to delete a photo by id.
 * @route DELETE /:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.delete('/:id', async (req, res) => {
    const photoId = req.params.id;

    try {
        const deletedPhoto = await Photo.findByIdAndDelete(photoId);

        if (!deletedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json({ message: 'Photo deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting photo' });
    }
});

/**
 * Endpoint to delete photos by day (entire day).
 * @route DELETE /date/:date
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
photosRouter.delete('/date/:date', async (req, res) => {
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

// Export the router
module.exports = photosRouter;