const express = require('express');
const app = express();

process.on('unhandledRejection', (r, p) => {
  console.log(r, p);
});

process.on('uncaughtException', (ex) => {
  console.log(ex);
});

require('./startup/globalMiddlewares.config')(app);
require('./startup/router.config')(app);
require('./startup/globalError.config')(app);
require('./startup/db.config')();

module.exports = app;
