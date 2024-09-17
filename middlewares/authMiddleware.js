const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Acceso denegado, no hay token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no válido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Establecer req.user
        console.log('Decoded User:', req.user); // Agregar para depuración
        next();
    } catch (error) {
        console.error('Token Error:', error); // Agregar para depuración
        res.status(401).json({ mensaje: 'Token no válido' });
    }
};


// Middleware para verificar si el usuario es administrador
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso denegado, no eres administrador' });
    }
    next();
};
