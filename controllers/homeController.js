const Post = require('../models/posts');
module.exports.home = function(req, res){
const User = require('../models/user');



    // Post.find({},function(err,posts){
    //     return res.render('home.ejs',{
    //         title: 'Codeial | Home',
    //         header:true,
    //         footer:true,
    //         posts:posts
    //     });
    // });

    //Populate the user of each posts
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function (err, posts) {
        User.find({},function (err, user) {
            return res.render('home.ejs',{
                title: 'Codeial | Home',
                header:true,
                footer:true,
                posts:posts,
                all_users:user
            });
        });
    if (err){
        console.log("Error in populating user homecontroller",err);
        return;
    } 
    
  });
}