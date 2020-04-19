//! Route
// const UserController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const { allUsers, userById, getUser } = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

router.get('/user', allUsers);
router.get('/user/:userId', requireSignin, getUser);
//! any routes cotaining user id : our app execute user by id function
router.param('userId', userById);

module.exports = router;