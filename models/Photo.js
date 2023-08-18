const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    image: {
        subType: Number,
        data: Buffer
    }
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;