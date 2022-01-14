{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container >ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },
                err:function(error){
                    console.error(error.responseText);
                }
            })
        });
    }
//method to create a post in DOM
let newPostDom = function(post){
    return $(`<li id = "post-${post._id} ">
    <p>
    
         <small>
             <a class = "delete-post-button" href="/posts/destroy/${post_id$}">X</a>
         </small>
         ${post.content}
     <br>
     <small>${post.user.name}</small>
    </p>
    <div class="post-comments">
        
         <form action="/comments/create" method="post">
             <input type ="text" name = "content" placeholder="Type here to add comments.." required>
             <input type ="hidden" name ="post" value="${post._id}">
             <input type ="submit" value="Add comment" >
         </form>
         <div class = "post-comments-list">
             <ul id = "post-comments=${post._id}">
             </ul>
         </div>
    </div>
 </li>`)
}

// Method to delete a post from dom
let deletePost = function(deleteLink){
    $(deleteLink).click(function(){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.post_id}`).remove();
            },
            error:function(data){
                console.log(error.responseText);
            }
        })
    }));
}

    createPost();
}