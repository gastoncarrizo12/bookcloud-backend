// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');


// CRUD de libros, solo accesible para administradores
router.post('/books', verifyToken, isAdmin, adminController.createBook);
router.put('/books/:id', verifyToken, isAdmin, adminController.updateBook);
router.delete('/books/:id', verifyToken, isAdmin, adminController.deleteBook);
router.get('/books/:id', verifyToken, isAdmin, adminController.getBookById);

module.exports = router;
