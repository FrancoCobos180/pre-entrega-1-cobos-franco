// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart, role } = req.body;
        const newUser = new User({ first_name, last_name, email, age, password, cart, role });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('cart');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('cart');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { first_name, last_name, email, age, password, cart, role }, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
