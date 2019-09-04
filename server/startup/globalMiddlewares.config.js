const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports = app => {
  // origin access allow
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
  });

  // handle logging on console
  app.use(logger('dev'));

  // handle incoming body object in request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // handle cookies
  app.use(cookieParser());

  // handle serving static files
  app.use(express.static(path.join(__dirname, 'public')));
};
