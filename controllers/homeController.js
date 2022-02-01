const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function(req, res){

    //Populate the user of each posts
    try{
        let posts =  await Post.find({})
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
        }).populate('likes');
        let users = await User.find({});
        friendshipuser=[];
        if(req.user){
            let listForCurrentUser = await User.findById(req.user.id);
            for(let uid of listForCurrentUser.friendships){
                let friendsuser = await User.findById(uid);
                friendshipuser.push(friendsuser)
            }
        }else{
            friendshipuser=[]
        
        }
        
            return res.render('home.ejs',{
                title: 'Codeial | Home',
                header:true,
                footer:true,
                posts:posts,
                all_users:users,
                addedfriends: friendshipuser,
                homePage:true
            });
    }catch(err){
        console.log('Error in populating posts',err);
        return;
    }
}