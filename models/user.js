// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema para el usuario
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,          // Tipo de dato: String
        required: true         // Este campo es obligatorio
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true           // El correo electrónico debe ser único
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,  // Referencia a un objeto de otra colección
        ref: 'Cart'                            // Colección de referencia: 'Cart'
    },
    role: {
        type: String,
        default: 'user',        // Valor por defecto: 'user'
        enum: ['user', 'admin'] // Solo puede ser 'user' o 'admin'
    }
});

// Middleware para encriptar la contraseña antes de guardar el usuario
UserSchema.pre('save', async function(next) {
    try {
        // Si la contraseña ha sido modificada (o es nueva)
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);   // Genera un salt con un factor de costo de 10
            this.password = await bcrypt.hash(this.password, salt); // Hash de la contraseña
        }
        next();  // Continua con el siguiente middleware o guarda el usuario
    } catch (error) {
        next(error);  // Pasa cualquier error al manejador de errores
    }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Crear el modelo y exportarlo
const User = mongoose.model('User', UserSchema);

module.exports = User;
