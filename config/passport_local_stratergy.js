const passport = require('passport');
const localStratergy = require('passport-local').Strategy;
const User = require('../models/user');

//Authentication using passport.js 
passport.use(new localStratergy({
    usernameField : 'email'
},
 function(email,password,done) {
    User.findOne({ email:email},function(err,user) {
        if(err){
            console.log('Error in finding user--->passport');
            return done(err);
        }

        if(!user||user.password!=password){
            console.log('Invalid username/password');
            return done(null,false);
        }

        return done(null,user);
    });
 }
));


//Serialize user to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user);
});


///deserialize user fro key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
      if(err){
            console.log('Error in finding user--->passport');
            return done(err);
        }

        return done(null,user);
 
    });
});


//check if user is authenticated
passport.checkAuthentication = function(req, res,next){
    //if user is signed in the passed on the next function(controllers action)
    if(req.isAuthenticated()){
       next();
    }
//if the user is not sign initialize
return res.redirect('/users/sign-up-in');

};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the signed in from the session cookie and we are just sending this to locals for views 
        res.locals.user = req.user;
        return;
    }
    next();
}

module.exports = passport;





