// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Puedes reutilizar el controlador

// Ruta accesible para usuarios y administradores
router.get('/', adminController.getBooks);

// Ruta protegida para eliminar un libro (requiere autenticación y autorización)

module.exports = router;