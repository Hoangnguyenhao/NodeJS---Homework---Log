const express = require('express');
const mongoose = require('mongoose');
const app = express();
const carRoutes = require('./routes/car.routes');
const logger = require('./middlewares/logger');
const connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.use(logger);
app.use('/api/cars', carRoutes);
app.listen(3000);
