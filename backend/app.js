const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

// Configuration pour éviter les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Body parser me permet de sécuriser les bodys de mes requêtes
app.use(bodyParser.json());

// Utilisation du package helmet pour sécuriser les données de mon header
app.use(helmet());

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;