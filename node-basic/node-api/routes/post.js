//routes

const PostController = require('../controllers/posts');
const express = require('express');
const router = express.Router();
const validator = require('../validators/index');
const UserController = require('../controllers/auth');

router.get('/', UserController.requireSignin, PostController.getPosts);
router.post('/createpost', validator.createPostValidator, PostController.createPost);
module.exports = router;