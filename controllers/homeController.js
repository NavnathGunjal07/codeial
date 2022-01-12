const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function(req, res){

    //Populate the user of each posts
    try{
        let posts =  await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        let users = await User.find({});
    
        
            return res.render('home.ejs',{
                title: 'Codeial | Home',
                header:true,
                footer:true,
                posts:posts,
                all_users:users
            });
    }catch(err){
        console.log('Error in populating posts',err);
        return;
    }
}