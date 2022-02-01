const Comment = require('../models/comment');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');


module.exports.create = async function(req, res){
   try{
    let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email');
          //  commentsMailer.newComment(comment);
          let job = queue.create('emails',comment).save(function(err){
                if(err)
                {
                    console.log("Error in sending to the queue",err);
                    return;
                }

                console.log(job.id);
            });
            if(req.xhr){    
               
              //  let comment =await Post.findOne({user:req.user._id}).populate('user').exec();
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });  
            }
            
            req.flash('success','Added new comment');
            res.redirect('back');
        }
   }catch(err){
        req.flash('error',err);
        return;
   }          
}

module.exports.destroy = async function(req, res){
  try{
    let comment = await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
           // destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            if(req.xhr)
            {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment deleted"
                });
            }
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
  }catch(err){
    req.flash('error', err);
    return;
}
}