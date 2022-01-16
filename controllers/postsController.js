const Post = require('../models/posts');
const Comment = require('../models/comment');


module.exports.create = async function(req, res){
  try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id 
    });
   
    if(req.xhr){
        //populating user when post added by ajax
       // console.log(post);
        //post = await post.populate('user', 'name').execPopulate();

       let post =await Post.findOne({user:req.user._id}).populate('user').exec();
   
        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post created!"
        });  
    }
    
    req.flash('success','Post published!');
    return res.redirect('back');
  }catch(err){
      req.flash('error', err);
      console.log(err);
    return res.redirect('back');
  }
  
}

module.exports.destroy = async function(req, res){
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