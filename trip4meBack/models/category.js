const mongoose = require('mongoose');



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    updated: Date,

}, { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);