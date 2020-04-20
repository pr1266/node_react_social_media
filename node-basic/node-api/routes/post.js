//! Routes

const PostController = require('../controllers/posts');
const express = require('express');
const router = express.Router();
const validator = require('../validators/index');
const UserController = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/', UserController.requireSignin, PostController.getPosts);
router.post('/post/new/:userId', UserController.requireSignin, PostController.createPost, validator.createPostValidator);
router.get('/post/:userId', UserController.requireSignin, PostController.postByUser);
router.param('userId', userById);

module.exports = router;