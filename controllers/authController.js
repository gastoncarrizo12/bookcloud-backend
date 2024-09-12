const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    const { email, password } = req.body;
    
    // Validar entrada
    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        user = new User({
            email,
            password,
            role: 'user' // Establecer el rol por defecto como 'user'
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await user.save();

        // Crear el token JWT
        const token = createToken(user);

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validar entrada
    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Crear y devolver el token JWT incluyendo el rol
        const token = createToken(user);

        // Respuesta basada en el rol
        const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
        res.json({ token, redirectTo, role: user.role });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

// Función para crear el token JWT
const createToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            role: user.role
        }
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // El token expira en 1 hora
    );
};
