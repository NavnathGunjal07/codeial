const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Post = require('../models/posts')



module.exports.profile = async function(req, res){

    try{
        let user = await User.findById(req.params.id);
        let isfriendOrNot = await User.findById(req.user.id);
        let post = await Post.find({user:req.params.id})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');;
        
        // console.log(post);
       const friendOrNot = user.friendships.find((item) => item == req.user.id);
        // if(!req.user.avatar==""){
        //      req.user.avatar =  User.avatarPath+'/'+"user_default.png";
        //  }
        User.findById(req.params.id,function(err,user){
            return res.render('user_profile', {
                title: 'User Profile',
                header:true,
                footer:true,
                profile_user:user,
                friendOrNot: friendOrNot,
                homePage:false,
                posts:post
            })
        });   
    }catch(err){
        console.log("Error in rendering profile", err);
    }
    
}

module.exports.update = async function (req, res) {
    if(req.user.id ==req.params.id){
            try{
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req,res,function(err){
                    if(err)
                        console.log('Multer Error',err);
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.bio = req.body.bio;
                                   
                    if(req.file)
                    {
                        if(user.avatar)
                        {
                            if(fs.existsSync(path.join(__dirname,'..',user.avatar)))
                                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        user.avatar = User.avatarPath+'/'+req.file.filename;

                    }
                    user.save();
                    return res.redirect('back');
                });
            }catch(err){
                console.log(err);
                req.flash('error',err);
                
                return res.redirect('back');
            }
    }
    else
    {
        return res.status(401).send('Unauthorized Access');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up",
        header:false,
        footer:false
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In",
        header:false,
        footer:false
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('/users/sign-in');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out successfully');
    return res.redirect('/');
}

