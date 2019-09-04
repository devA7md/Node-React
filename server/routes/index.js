const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('from index router, with modification');
});

module.exports = router;
