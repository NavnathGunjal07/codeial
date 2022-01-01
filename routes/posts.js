const express = require('express');
const router = express.Router();
const userPosts = require('../controllers/userPosts');


router.get('/posts',userPosts.posts);




module.exports = router;