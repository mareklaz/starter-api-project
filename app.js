require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createError = require('http-errors');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('./config/db.config');
const routes = require('./routes/routes.config');

const app = express();

app.use(logger('dev'));

const corsOptions = {
  origin: ['http://localhost:3001', 'https://starter-app-project-production.up.railway.app/'],
};
app.use(cors());

app.use(express.json());
app.use('/api', cors(corsOptions), routes);

// Handle Errors

app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found');
  } else if (error.message.includes('E11000')) {
    error = createError(400, 'Already exists');
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(401, error);
  } else if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        }),
        {}
      )
    : undefined;

  res.status(error.status).json(data);
});

/* App listen port */

app.listen(process.env.PORT || 3001, () => {
  console.log('App in process at', process.env.PORT || 3001);
});
