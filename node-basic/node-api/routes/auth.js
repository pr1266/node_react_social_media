//! Route
const UserController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
// const validator = require('../validators/index');

router.post('/signup', UserController.signup);
module.exports = router;