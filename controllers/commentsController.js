const Comment = require('../models/comment');
const Post = require('../models/posts');



module.exports.create = function(req, res){
    Post.findById(req.body.post,function(err, post){
        if(err){
            conslole.log('Error in finding post',err);
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err, comment){

                if(err){
                    console.log('Error in adding comment',err);
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
        else
        {
            console.log('Post not found');
            return;
        }
    });
}