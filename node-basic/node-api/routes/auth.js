//! Route
const UserController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const validator = require('../validators/index');
const { userById } = require('../controllers/user');

router.post('/signup', validator.userSignupValidator, UserController.signup);
router.post('/signin', UserController.signin);
router.get('/signout', UserController.signout);

//! any routes cotaining user id : our app execute user by id function
router.param('userId', userById);

module.exports = router;