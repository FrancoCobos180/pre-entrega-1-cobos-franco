// models/cart.js
const mongoose = require('mongoose');

// Definir el esquema para el carrito
const CartSchema = new mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

// Crear el modelo y exportarlo
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
