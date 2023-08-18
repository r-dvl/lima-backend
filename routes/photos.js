var express = require('express');
var router = express.Router();

const Photo = require('../models/Photo');

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.render('photos', { photos });
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining photos from server.' });
    }
});

module.exports = router;