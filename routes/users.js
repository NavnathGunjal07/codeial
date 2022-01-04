const express = require('express');
const router = express.Router();
const passport = require('passport');




const usersController = require('../controllers/usersController');


router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-up-in',usersController.signUpIn);

router.post('/create',usersController.create);


//Use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-up-in'},
),usersController.createSession);



module.exports = router;