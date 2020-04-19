//! Route
const UserController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const validator = require('../validators/index');
const { allUsers } = require('../controllers/user');

router.post('/signup', validator.userSignupValidator, UserController.signup);
router.post('/signin', UserController.signin);
router.get('/signout', UserController.signout);

module.exports = router;