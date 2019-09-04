const User = require('../models/user.model');
const asyncHandler = require('../middlewares/asyncCallbacks.middleware');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const createUser = asyncHandler(async (req, res) => {
  // check of the validity of the body object
  const { error } = User.signupValidation(req.body);
  if (error) return res.status(400).send(error.message);

  // check if user already exist
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send('User already exist');

  const { firstName, lastName, password, username, gender } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    username,
    gender
  });

  const savedUser = await user.save();
  const token = savedUser.generateToken();
  res.header('x-auth-token', token);
  res.send({ token });
});

const loginUser = asyncHandler(async (req, res) => {
  const { error } = User.loginValidation(req.body);
  if (error) return res.status(400).send(error.message);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('Invalid email or password');

  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect) return res.status(404).send('Invalid email or password');

  const token = user.generateToken();
  res.header('x-auth-token', token);
  res.send({ token });
});

module.exports = {
  createUser,
  getUsers,
  loginUser
};
