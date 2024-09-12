const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    coverImage: { type: String }, // URL o ruta de la imagen de portada
    publishedDate: { type: Date },
    price: { type: Number }
});

module.exports = mongoose.model('Book', BookSchema);
