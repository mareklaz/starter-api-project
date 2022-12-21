require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('./config/db.config');
const routes = require('./routes/routes.config');

const app = express();
app.use(cors());
app.use(logger('dev'));

app.use(express.json()); // Nos permite usar el req.body
app.use('/api', routes);

/* App listen port */
app.listen(process.env.PORT || 3001, () => {
  console.log('App in process at', process.env.PORT || 3001);
});
