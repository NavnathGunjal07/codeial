const User = require('../models/user')
//render profile page
module.exports.profile = function(req,res){
    return res.render('user_profile.ejs',{
        title: 'User Profile'
    });
}


//render signup or signip page
module.exports.signUpIn = function(req,res){
//   if(req.isAuthenticated())
//   {
//       console.log(req.user);     
//     return res.redirect('/users/profile');
//   }
    return res.render('user_signInUp',{
        title:"Codeial | Sign Up | Sign In"
        // header:true,
        // footer:true
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
   console.log('createSession : ',req.isAuthenticated())
   return res.redirect('/');
}