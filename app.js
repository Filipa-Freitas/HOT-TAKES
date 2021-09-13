
const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.CONNECTION_STRING_MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes depuis cet IP, veuillez réessayer dans 15 minutes!'
});

app.use(limiter); // contre brute force

app.use(mongoSanitize()); // Contre NOSQL query injection

app.use(helmet()); // contre attaque xss

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;