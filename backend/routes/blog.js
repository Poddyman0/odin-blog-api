const express = require("express");
const router = express.Router();
const authMiddleware = require('../authMiddleware')

// Require controller modules.
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

// users routes
//

// POST request to get login a user and use token
router.post("/user/login/get", authMiddleware, user_controller.user_login_get);

//
// POST request to login user and return token
router.post("/user/login/post", user_controller.user_login_post);

// POST request to log out user.
router.get("/user/logout", user_controller.user_logout_post);
//
// POST request to create a user.
router.post("/user/create", user_controller.user_create_post)


// comment routes

////
// GET comments for a post.
router.get("/post/:postID/comments", comment_controller.all_post_comments)


//
// POST create comment for a post.
router.post("/post/:postID/comment", authMiddleware, comment_controller.create_comment)

////
// GET a comment for a post.
router.get("/post/:postID/comment/:commentID", comment_controller.a_post_comment)

//
// POST update comment for a post.
router.post("/post/:postID/comment/:commentID/update", authMiddleware, comment_controller.update_comment)

//
// POST delete a comment for a post.
router.post("/post/:postID/comment/:commentID/delete", authMiddleware, comment_controller.delete_comment)


// post routes

////
// GET posts
router.get("/posts", post_controller.all_posts)

////
// GET a post
router.get("/post/:postID", post_controller.a_post)

////
// POST create a post
router.post("/post", authMiddleware, post_controller.create_post)

//
// POST update a post
router.post("/post/:postID/update", authMiddleware, post_controller.update_post)
//
// POST delete a post
router.post("/post/:postID/delete",authMiddleware, post_controller.delete_post)

module.exports = router;
