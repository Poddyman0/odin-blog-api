const User = require("../models/usersModel")
const Post = require("../models/postsModel")
const Comment = require("../models/commentsModel")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { trusted } = require("mongoose");
const passport = require("passport");
const bcrypt = require('bcryptjs')

// GET comments for a post.
exports.all_post_comments = asyncHandler(async (req, res, next) => {
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
                            console.log(comment)
                        //console.log("comment By user ID", commentByUserID, "user ID", userID)

                        aPostComment.commentByUser._id = user._id
                        aPostComment.commentByUser.username = user.username
                        //console.log(aPostComment.commentByUser)
                        aPostCopy.commentsForPost.push(aPostComment)

                        }
                })
            
            }
        })
    })
    res.json({post: aPostCopy})
})

// GET a comment for a post.
exports.a_post_comment = asyncHandler(async (req, res, next) => {
    const aPost = await Post.findById(req.params.postID).exec()
    const aCommentForAPost = await Comment.findById(req.params.commentID).exec()
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
        console.log("postCommentID", postCommentID)

        let commentID = `${aCommentForAPost._id}`
        console.log("commentID", commentID)
        
        
        let aPostComment = {}
        aPostComment._id = aCommentForAPost._id
        aPostComment.body = aCommentForAPost.body
        aPostComment.commentByUser = {};
        aPostComment.timestamp = aCommentForAPost.timestamp
        aPostComment._v = aCommentForAPost._v
        
        if (commentID === postCommentID) {
                let commentByUserID = `${aCommentForAPost.commentByUser}`
                
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
    res.json({post: aPostCopy})
})

// POST create comment for a post
exports.create_comment = [
    body("body", "Body must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Body must have at least 1 character'),
    body("timestamp", "Timestamp must be an ISO date")
        .isISO8601()
        .toDate()
        .withMessage("Timestamp must be an ISO date")
        .escape(),
    body("commentByUser", "commentByUser name must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Value must have at least 1 character'),
    asyncHandler(async (req, res, next) => {
            const newComment = new Comment({
                body: req.body.body,
                timestamp: req.body.timestamp,
                commentByUser: req.body.commentByUser,
            })
            const aPost = await Post.findById(req.params.postID).exec()
            aPost.commentsForPost.push(newComment._id)
            console.log("apost", aPost)
            console.log("aComment", newComment._id)

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json({
                    post: aPost,
                    comment: newComment,
                    errors: errors.array(),
                    msg: "errors",
                }) 
            } else {
                await newComment.save()
                await aPost.save()
                res.json({
                    post: aPost,
                    comment: newComment, 
                    msg: "Comment Created Successfully",
                })
            }

        })
]   

// POST update comment for a post.
exports.update_comment = [
    body("body", "Body must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Body must have at least 1 character'),
    body("timestamp", "Timestamp must be an ISO date")
        .isISO8601()
        .toDate()
        .withMessage("Timestamp must be an ISO date")
        .escape(),
    body("commentByUser", "commentByUser name must contain at least 1 characters")
        .isLength({ min: 1 }).withMessage('Value must have at least 1 character'),
    asyncHandler(async (req, res, next) => {
        const commentToUpdate = Comment.findById(req.params.commentID).exec()
        const newComment = new Comment({
            body: req.body.body,
            timestamp: req.body.timestamp,
            commentByUser: req.body.commentByUser,
            _id: req.body._id
        })
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                comment: commentToUpdate,
                errors: errors.array(),
                msg: "errors",
            }) 
        } else {
            await Comment.findByIdAndUpdate(req.params.commentID, newComment, {})
            res.json({
                comment: newComment, 
                msg: "Comment Updated Successfully",
            })
        }
        })
]

// POST delete a comment for a post
exports.delete_comment= asyncHandler(async (req, res, next) => {
    const commentIDToDelete = await Comment.findById(req.params.commentID).exec()
    const postCommentIDToDelete = await Post.findById(req.params.postID).exec()
    let commentID = `${req.params.commentID}`
    console.log("commentID", commentID)
    const index = postCommentIDToDelete.commentsForPost.indexOf(commentID);
    if (index !== -1) {
        postCommentIDToDelete.commentsForPost.splice(index, 1);
    }
    let errors = []
    if (commentIDToDelete === null) {
        errors.push("Comment ID does not exist")
        res.json({
            post: postCommentIDToDelete,
            comment: commentIDToDelete,
            errors: errors,
            msg: "Error"
        })
    } else {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentID)
        await postCommentIDToDelete.save()
        res.json({
            post: postCommentIDToDelete,
            comment: deletedComment,
            msg: "Comment deleted successfully", 
        })
    }

})
