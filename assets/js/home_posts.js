{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
//method to create a post in DOM
let newPostDom = function(post){
    document.getElementById("add-new-posts-form-home").style.display = "none";
    return $(`<li class = "home-posts-li" id="post-${post._id}">
    <p>
         <div>
            <div id="user-profile-pic-posts">
                <img src="${post.user.avatar}" alt="${post.user.name}">
            </div>  
            <small>
                ${post.user.name}
           </small>

         <small>
             <a style="margin-left:60%;"class="delete-post-button"  href="/posts/destroy/${ post._id }">Delete Post</a>
         </small>
         </div>
         <div>
            <h4><b>${post.topic} </b></h4>
        </div>
        <div>${ post.content }</div>
         
     
     
    </p>
    <details>
    <summary>All Comments</summary>
    <div class="post-comments">
        
         <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
             <input type="text" name="content" placeholder="Type Here to add comment..." required>
             <input type="hidden" name="post" value="${ post._id }" >
             <button type ="submit">Comment<i class="fas fa-paper-plane"></i></button>
         </form>
         <div class="post-comments-list">
             <ul id="post-comments-${ post._id }">
             </ul>
         </div>
    </div>
    </details>
 </li>`)
}

// Method to delete a post from dom
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}

// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
       new PostComments(postId);
    });
}

// function showAddPostsForm(e){
//     e.preventDefault();
//     console.log("hello");
    
    
    
// }
document.getElementById("add-posts-header").addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("add-new-posts-form-home").style.display = "block";
})
createPost();
document.getElementById("add-new-posts-form-home").style.display = "none";
convertPostsToAjax();

}

