const indexRouter = require('../routes');
const userRouter = require('../routes/user.router');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/users', userRouter);
};
