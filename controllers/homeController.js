const Post = require('../models/posts');
module.exports.home = function(req, res){
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
    if (err){
        console.log("Error in populating user homecontroller",err);
        return;
    } 
    return res.render('home.ejs',{
        title: 'Codeial | Home',
        header:true,
        footer:true,
        posts:posts
    });
  });
}