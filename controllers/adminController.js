const Book = require('../models/Books');

// Crear un nuevo libro
exports.createBook = async (req, res) => {
    try {
        const { title, author, genre, description, coverImage, publishedDate, price } = req.body;

        // Crear un nuevo libro con los datos proporcionados
        const newBook = new Book({
            title,
            author,
            genre,
            description,
            coverImage,
            publishedDate,
            price
        });

        // Guardar el libro en la base de datos
        await newBook.save();

        // Devolver el libro creado
        res.json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el libro' });
    }
};

// Obtener todos los libros
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los libros' });
    }
};

// Actualizar un libro
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, description, coverImage, publishedDate, price } = req.body;

        // Actualizar el libro con los nuevos datos
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            genre,
            description,
            coverImage,
            publishedDate,
            price
        }, { new: true });

        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el libro' });
    }
};

// Eliminar un libro
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Eliminar el libro por su ID
        await Book.findByIdAndDelete(id);

        res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el libro' });
    }
};
