const createError = require('http-errors');
const logger = require('../logging/log.config');

module.exports = app => {
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // global error handler
  // any function calls next(error) will end up here
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // logging errors to file
    logger.log({
      level: 'error',
      message: err.message,
      meta: err
    });

    // render the error page
    res.status(err.status || 500).send(err.message);
  });
};
