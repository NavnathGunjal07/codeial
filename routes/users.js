const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');


router.get('/profile',usersController.profile);
router.get('/sign-up-in',usersController.signUpIn);

router.post('/create',usersController.create);

module.exports = router;