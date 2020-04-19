//! Route
// const UserController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const { allUsers, userById, getUser, updateUser, deleteUser } = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

router.get('/user', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);
// router.get('/user/:userId/update', requireSignin, updateUser);
//! any routes cotaining user id : our app execute user by id function
router.param('userId', userById);

module.exports = router;