const Post = require('../models/posts');
const Comment  = require('../models/comment');


module.exports.create = async function(req, res){
  try{
    console.log('post created by ajax',req.body);
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
        
    })
    console.log(req.xhr);
    if(req.xhr){
        console.log('in if xhr');     
        return res.status(200).json({
            data:{
                post:post
            },
            message:'post created'
        });  
    }
    
    req.flash('success','Post published!');
    return res.redirect('back');
  }catch(err){
      req.flash('error',err);
      return res.redirect('back');
  }
  
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
    if(post.user==req.user.id)
    {
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        if(req.xhr)
        {
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'Post Deleted'
            });
        }
        req.flash('success','Post and associated comments deleted successfully');
        return res.redirect('back');
    }
    else
    {
        req.flash('error','You cannot delete this post');
        return res.redirect('back');
    }
    }catch(err){
       req.flash('error',err);
       return res.redirect('back');
    }
}