//! Routes

const PostController = require('../controllers/posts');
const express = require('express');
const router = express.Router();
const validator = require('../validators/index');
const UserController = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/', UserController.requireSignin, PostController.getPosts);
router.post('/createpost', UserController.requireSignin, validator.createPostValidator, PostController.createPost);
// UserController.requireSignin
router.param('userId', userById);

module.exports = router;