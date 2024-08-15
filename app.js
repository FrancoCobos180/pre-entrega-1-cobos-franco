const mongoose = require('mongoose'); // Declaración de mongoose
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/mi_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Conectado a la base de datos MongoDB');
});

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
