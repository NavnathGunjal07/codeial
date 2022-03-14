|-- undefined
    |-- .gitignore
    |-- app.js
    |-- gulpfile.js
    |-- package-lock.json
    |-- package.json
    |-- README.MD
    |-- assets
    |   |-- css
    |   |   |-- chat_box.css
    |   |   |-- footer.css
    |   |   |-- header.css
    |   |   |-- home.css
    |   |   |-- layout.css
    |   |   |-- sign_in.css
    |   |   |-- sign_up.css
    |   |   |-- user_profile.css
    |   |-- images
    |   |   |-- favicon.ico
    |   |   |-- user_default.png
    |   |-- js
    |   |   |-- chat_engine.js
    |   |   |-- home_posts.js
    |   |   |-- home_posts_comments.js
    |   |   |-- toggle_likes.js
    |   |-- scss
    |       |-- chat_box.scss
    |       |-- footer.scss
    |       |-- header.scss
    |       |-- home.scss
    |       |-- layout.scss
    |       |-- sign_in.scss
    |       |-- sign_up.scss
    |       |-- user_profile.scss
    |-- config
    |   |-- chat_sockets.js
    |   |-- environment.js
    |   |-- kue.js
    |   |-- middleware.js
    |   |-- mongoose.js
    |   |-- nodemailer.js
    |   |-- passport-google-oauth2-strategy.js
    |   |-- passport-jwt-strategy.js
    |   |-- passport-local-strategy.js
    |   |-- view-helper.js
    |-- controllers
    |   |-- commentsController.js
    |   |-- freindshipController.js
    |   |-- homeController.js
    |   |-- likesController.js
    |   |-- postsController.js
    |   |-- usersController.js
    |   |-- api
    |       |-- v1
    |           |-- posts_api.js
    |           |-- users_api.js
    |-- mailers
    |   |-- comments_mailer.js
    |-- models
    |   |-- comment.js
    |   |-- friendship.js
    |   |-- like.js
    |   |-- posts.js
    |   |-- user.js
    |-- production_logs
    |   |-- 20220209-0000-01-access.log
    |   |-- access.log
    |-- public
    |   |-- rev-manifest.json
    |   |-- assets
    |       |-- rev-manifest.json
    |       |-- css
    |       |   |-- chat_box-817f23d078.css
    |       |   |-- footer-e6ca61d5be.css
    |       |   |-- header-1bbb098784.css
    |       |   |-- home-165a1d7642.css
    |       |   |-- layout-6399b3a1a4.css
    |       |   |-- sign_in-c7b1aa28d3.css
    |       |   |-- sign_up-97c5bad3f5.css
    |       |   |-- user_profile-89641648cc.css
    |       |-- images
    |       |   |-- user_default-11e0ad69d5.png
    |       |-- js
    |           |-- chat_engine-8bb9568d90.js
    |           |-- home_posts-feb4426be8.js
    |           |-- home_posts_comments-b9c907727b.js
    |           |-- toggle_likes-c01c8555fe.js
    |-- routes
    |   |-- comments.js
    |   |-- friendship.js
    |   |-- index.js
    |   |-- likes.js
    |   |-- posts.js
    |   |-- users.js
    |   |-- api
    |       |-- index.js
    |       |-- v1
    |           |-- index.js
    |           |-- posts.js
    |           |-- users.js
    |-- uploads
    |   |-- users
    |       |-- avatars
    |           |-- avatar-1642484705712
    |           |-- avatar-1642486685998
    |           |-- avatar-1642495542419
    |           |-- avatar-1644314397698
    |           |-- avatar-1644343476937
    |           |-- avatar-1644343741119
    |           |-- avatar-1644344090564
    |-- views
    |   |-- home.ejs
    |   |-- layout.ejs
    |   |-- user_profile.ejs
    |   |-- user_sign_in.ejs
    |   |-- user_sign_up.ejs
    |   |-- _chat_box.ejs
    |   |-- _comments.ejs
    |   |-- _footer.ejs
    |   |-- _header.ejs
    |   |-- _posts.ejs
    |   |-- mailers
    |       |-- comments
    |           |-- new_comment.ejs
    |-- workers
        |-- comment_email_worker.js
