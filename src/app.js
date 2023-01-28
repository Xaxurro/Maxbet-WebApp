const express  =require('express');
const bodyParser = require('body-parser');
const _connect = require('./db/_connect');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

_connect();

const app = express();

app.use(bodyParser.json());

app.use('/account', userRoutes);

app.listen(process.env.PORT, () => console.log(`App listening on ${process.env.PORT}`));