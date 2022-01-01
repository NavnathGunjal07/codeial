const User = require('../models/user')
//render profile page
module.exports.profile = function(req,res){
    return res.render('user_profile.ejs',{
        title: 'User Profile'
    });
}


//render signup or signup page
module.exports.signUpIn = function(req,res){
    return res.render('user_signInUp.ejs',{
        title:"Codeial | Sign Up | Sign In"
    });
}


//get sign up data
module.exports.create = function(req, res){
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err, user){
        if(err){
            console.log("Error in finding user");
            return;
        }

        if(!user){
            User.create(req.body,function(err, user){
                if(err){
                    console.log("Error in creating user while signup");
                    return;
                }

                return res.redirect('/users/sign-up-in');
            })
        }
        else
        {
            return res.redirect('back');
        }

    })
}


//sign in and create session for user
module.exports.createSession = function(req, res){
    //todo later
}