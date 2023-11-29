const express = require('express');
const photosRouter = express.Router();
const Photo = require('../models/Photo');


////// Cat Watcher APP CRUD //////
//// Create ////
// Post photo
photosRouter.post('/upload', async (req, res) => {
    try {
        const { date, image, cat } = req.body;

        const newPhoto = new Photo({
            date: new Date(date),
            image: image,
            cat: cat
        });

        await newPhoto.save();
        res.json({ message: 'Photo uploaded' });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

//// Read ////
// Get all photos
photosRouter.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        const photoResponses = photos.map(photo => {
            return {
                id: photo._id,
                date: photo.date,
                image: photo.image,
                cat: photo.cat
            };
        });
        res.json(photoResponses);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get photo by id
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

// Get photo by date
photosRouter.get('/date/:date', async (req, res) => {
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

//// Update ////
// Change cat value
photosRouter.put('/updateCat/:photoId', async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const { newCatValue } = req.body;

        // Encuentra la foto por su ID
        const photo = await Photo.findById(photoId);

        // Si la foto existe, actualiza el valor de 'cat'
        if (photo) {
            photo.cat = newCatValue;
            await photo.save();
            res.json({ message: 'Cat value updated' });
        } else {
            res.status(404).json({ error: 'Photo not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

//// Delete ////
// Delete by Id
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

// Delete by date (Entire date deleted)
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

module.exports = photosRouter;