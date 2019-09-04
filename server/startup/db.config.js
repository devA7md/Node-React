const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('r_app:db');

const opts = {
  useNewUrlParser: true
};

module.exports = () => {
  mongoose.connect(config.get('DB.URI'), opts)
    .then(() => debug('DB connected to the app'))
    .catch(err => debug(err.message));
};
