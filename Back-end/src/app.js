// Se encarga de las rutas
const express = require('express');
// Permite manejar las request y responses
const bodyParser = require('body-parser');
const _connect = require('./db/_connect');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Permite usar las variables con informacion sensible en .env
require('dotenv').config();

_connect();

const app = express();

app.use(bodyParser.json());

app.use('/account', userRoutes);
app.use('/product', productRoutes);

// Accede al puerto guardado en .env y se hacen las request ahi
app.listen(process.env.PORT, () => console.log(`App listening on ${process.env.PORT}`));