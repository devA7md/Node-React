const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 16
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 16
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const re = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        return re.test(value);
      },
      message: props => `${ props.value } is not valid email - (EX. name@site.com)`
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024
  },
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 16,
    unique: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  }
});

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.generateToken = function () {
  const payload = {
    id: this._id,
    username: this.username
  };

  return jwt.sign(payload, config.get('SECRET_TOKEN'));
};

schema.statics.signupValidation = function (user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(16).required(),
    lastName: Joi.string().min(2).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
    username: Joi.string().min(4).max(16).required(),
    gender: Joi.string().required()
  });

  return schema.validate(user);
};

schema.statics.loginValidation = function (user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required()
  });

  return schema.validate(user);
};

module.exports = mongoose.model('user', schema);
