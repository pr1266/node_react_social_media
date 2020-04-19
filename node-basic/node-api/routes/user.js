//! Route
// const UserController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const { allUsers } = require('../controllers/user');

router.get('/user', allUsers);

//! any routes cotaining user id : our app execute user by id function
router.param('userId', userById);

module.exports = router;