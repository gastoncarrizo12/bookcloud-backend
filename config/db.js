const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar la base de datos', error);
        process.exit(1); // Salir si falla la conexión
    }
};

module.exports = connectDB;
