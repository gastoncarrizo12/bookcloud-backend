const Book = require('../models/Books');

// Crear un nuevo libro
exports.createBook = async (req, res) => {
    try {
        const { title, author, genre, description, coverImage, publishedDate, price } = req.body;

        // Verificar si todos los campos necesarios están presentes
        if (!title || !author || !genre) {
            return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
        }

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
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ mensaje: 'Error al crear el libro' });
    }
};

// Obtener todos los libros
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ mensaje: 'Error al obtener los libros' });
    }
};

// Obtener libro por id
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error al obtener el libro:', error);
        res.status(500).json({ mensaje: 'Error al obtener el libro' });
    }
};

// Actualizar un libro
// controllers/adminController.js
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

        if (!updatedBook) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }

        res.json(updatedBook);
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el libro' });
    }
};


// Eliminar un libro
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID recibido para eliminación:', id);  // Para depuración

        // Verifica si el libro existe antes de intentar eliminarlo
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }

        // Eliminar el libro por su ID
        await Book.findByIdAndDelete(id);

        res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);  // Para depuración
        res.status(500).json({ mensaje: 'Error al eliminar el libro' });
    }
};
