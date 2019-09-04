const express = require('express');
const router = express.Router();

const { mid } = require('../middlewares/user.middlewares');
const { createUser, getUsers, loginUser } = require('../controller/user.controller');

router.get('/', mid, getUsers);
router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;
