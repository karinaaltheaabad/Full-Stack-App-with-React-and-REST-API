'use strict';

// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
var { sequelize } = require('./models');
const indexRouter = require('./routes');
const userRouter = require('./routes/users');
const courseRouter = require('./routes/courses');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// test database connection 
(async () => {
  try {
    await sequelize.authenticate(); 
    console.log("Successfully connected to the database");
  } catch (err) {
    console.log("Error connecting to the database")
  }
})();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes 
app.use('/', indexRouter);
app.use('/api', userRouter);
app.use('/api', courseRouter);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
