const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const router = require('./routes/index');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

router(app);

module.exports = app;
