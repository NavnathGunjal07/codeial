const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userPosts = require('../controllers/userPosts');

router.get('/',homeController.home);

router.use('/users',require('./users'));

router.get('/posts',userPosts.posts);






module.exports = router;