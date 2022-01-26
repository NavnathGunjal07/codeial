const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    ,
    //user can comment under the posts
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps:true
});


const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;