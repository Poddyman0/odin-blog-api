const User = require("../models/usersModel")
const Post = require("../models/postsModel")
const Comment = require("../models/commentsModel")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { trusted } = require("mongoose");
const passport = require("passport");
const bcrypt = require('bcryptjs')

// GET all posts
exports.all_posts = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({}).exec()
    
    const allCommentsForAPost = await Comment.find({}).exec()
    const allUsers = await User.find({}).exec()
    
    //let commentsForPostToSend = []
    /*
    let errors = []
    if (allPosts === null) {
        errors.push("Post ID does not exist")
    }
    */
    let allPostsCopy = []
    let aPostCopy = {}

    allPosts.forEach(post => {
        console.log("post", post)
        //allPostsCopy.push(post)
            aPostCopy = {}
            aPostCopy._id = post._id
            aPostCopy.title = post.title
            aPostCopy.timestamp = post.timestamp
            aPostCopy.body = post.body
            aPostCopy.postByUser = {}
            aPostCopy.isPublished = post.isPublished
            aPostCopy.commentsForPost = []
            aPostCopy._v = post._v
            allUsers.forEach(user => {
                let postedByUserID = `${post.postByUser}`
                let userIDInfo = `${user._id}`
                if (postedByUserID === userIDInfo) {
                    aPostCopy.postByUser._id = user._id
                    aPostCopy.postByUser.username = user.username

                }
            })
            if (post.commentsForPost.length > 0) {
                post.commentsForPost.forEach(PCID => {
                
                    let postCommentID = `${PCID}`
                    allCommentsForAPost.forEach(comment => {
                        let commentID = `${comment._id}`
                        let aPostComment = {}
                        aPostComment._id = comment._id
                        aPostComment.body = comment.body
                        aPostComment.commentByUser = {};
                        aPostComment.timestamp = comment.timestamp
                        aPostComment._v = comment._v
                        if (commentID === postCommentID) {
                            let commentByUserID = `${comment.commentByUser}`
                            allUsers.forEach(user => {
                                let userID = `${user._id}`
                                    if (userID === commentByUserID) {
            
                                    aPostComment.commentByUser._id = user._id
                                    aPostComment.commentByUser.username = user.username
                                    aPostCopy.commentsForPost.push(aPostComment)
            
                                    }
                            })
                        
                        }
                        
                    })
                    if (aPostCopy.commentsForPost.length === post.commentsForPost.length) {
                        allPostsCopy.push(aPostCopy)
                    }
                })
            } else {
                allPostsCopy.push(aPostCopy)

            }
            
    })
    
    /*
    if (commentsForPostToSend.length === 0) {
        errors.push("This post ID does not have any comments")
    }
    if (allCommentsForPost === null) {
        errors.push("No comments found")
    }
    */
    console.log("allPostsCopy", allPostsCopy)
    res.json({posts: allPostsCopy})

    
})

// GET a post
exports.a_post = asyncHandler(async (req, res, next) => {
    const aPost = await Post.findById(req.params.postID).exec()
    const allCommentsForAPost = await Comment.find({}).exec()
    const allUsers = await User.find({}).exec()
    let aPostCopy = {}
    aPostCopy = {}
    aPostCopy._id = aPost._id
    aPostCopy.title = aPost.title
    aPostCopy.timestamp = aPost.timestamp
    aPostCopy.body = aPost.body
    aPostCopy.postByUser = {}
    aPostCopy.isPublished = aPost.isPublished
    aPostCopy.commentsForPost = []
    aPostCopy._v = aPost._v
    allUsers.forEach(user => {
        let postedByUserID = `${aPost.postByUser}`
        let userIDInfo = `${user._id}`
        if (postedByUserID === userIDInfo) {
            aPostCopy.postByUser._id = user._id
            aPostCopy.postByUser.username = user.username

        }
    
    })
    aPost.commentsForPost.forEach(PCID => {
                
        let postCommentID = `${PCID}`
        allCommentsForAPost.forEach(comment => {
            let commentID = `${comment._id}`
            let aPostComment = {}
            aPostComment._id = comment._id
            aPostComment.body = comment.body
            aPostComment.commentByUser = {};
            aPostComment.timestamp = comment.timestamp
            aPostComment._v = comment._v
            if (commentID === postCommentID) {
                let commentByUserID = `${comment.commentByUser}`
                allUsers.forEach(user => {
                    let userID = `${user._id}`
                        if (userID === commentByUserID) {

                        aPostComment.commentByUser._id = user._id
                        aPostComment.commentByUser.username = user.username
                        aPostCopy.commentsForPost.push(aPostComment)

                        }
                })
            
            }
        })
    })
    res.json({post: aPostCopy})
})

// POST create a post
exports.create_post = [
    body("title", "Title must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Value must have at least 1 character'),
    body("timestamp", "Timestamp must be an ISO date")
        .isISO8601()
        .toDate()
        .withMessage("Timestamp must be an ISO date")
        .escape(),
    body("body", "Body must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Value must have at least 1 character'),
    body("postByUser", "postByUser name must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Value must have at least 1 character'),
    body("isPublished", "isPublished must be a boolean of either true or false")
        .isBoolean()
        .withMessage("isPublished must be a boolean of either true or false")
        .escape(),
    asyncHandler(async (req, res, next) => {
        if (!req.userID) {
            res.json({
                msg: "You must login to create a post",
            }) 
        }
            const newPost = new Post({
                title: req.body.title,
                timestamp: req.body.timestamp,
                body: req.body.body,
                postByUser: req.body.postByUser,
                isPublished: req.body.isPublished,
                commentsForPost: []
            })
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json({
                    post: newPost,
                    errors: errors.array(),
                    msg: "errors",
                }) 
            } else {
                await newPost.save()
                res.json({
                    post: newPost, 
                    msg: "Post Created Successfully",
                })
            }
    })
    
]

//POST update a post
exports.update_post = [
    body("title", "Title must contain at least 1 characters")
        .isLength({ min: 1 })
        .withMessage("Title must contain at least 1 characters"),
    body("timestamp", "Timestamp must be an ISO date")
        .isISO8601()
        .toDate()
        .withMessage("Timestamp must be an ISO date")
        .escape(),
    body("body", "Body must contain at least 1 characters")
        .isLength({ min: 1 })
        .withMessage("Body must contain at least 1 characters"),
    body("postByUser", "postByUser name must contain at least 1 characters")
        .isLength({ min: 1 })
        .withMessage("postByUser name must contain at least 1 characters"),
    body("isPublished", "isPublished must be a boolean of either true or false")
        .isBoolean()
        .withMessage("isPublished must be a boolean of either true or false")
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const postToUpdate = Post.findById(req.params.postID).exec();
        const newPost = new Post({
            title: req.body.title,
            timestamp: req.body.timestamp,
            body: req.body.body,
            postByUser: req.body.postByUser,
            isPublished: req.body.isPublished,
            commentsForPost: req.body.commentsForPost,
            _id: req.body._id,
        })
        if (!errors.isEmpty()) {
            res.json({
                post: postToUpdate,
                errors: errors.array(),
                msg: "errors",
            }) 
        } else {
            await Post.findByIdAndUpdate(req.params.postID, newPost, {})
            res.json({
                post: newPost, 
                msg: "Post Updated Successfully",
            })
        }
    })
]

// POST delete a post
exports.delete_post = asyncHandler(async (req, res, next) => {
    const postIDToDelete = await Post.findById(req.params.postID).exec()
    let errors = []
    if (postIDToDelete === null) {
        errors.push("Post ID does not exist")
        res.json({
            post: postIDToDelete,
            errors: errors,
            msg: "Error"
        })
    } else {
        const deletedPost = await Post.findByIdAndDelete(req.params.postID)
        res.json({
            post: deletedPost,
            msg: "Post deleted successfully" 
        })
    }
})
