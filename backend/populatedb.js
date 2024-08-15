#! /usr/bin/env node

console.log(
    'This script populates some test users, posts and comments to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  const userArgs = process.argv.slice(2);
  
  const User = require("./models/usersModel");
  const Comment = require("./models/commentsModel");
  const Post = require("./models/postsModel")

  
  const users = [];
  const comments = [];
  const posts = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createComments()
    await createPosts();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  

  async function userCreate(index, username, email, password, isAuthor, isNormalUser) {
    const user = new User({ 
        username: username,
        email: email,
        password: password,
        isAuthor: isAuthor,
        isNormalUser: isNormalUser,
    });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
  }
  
  async function commentCreate(index, body, timestamp, commentByUser) {
    const commentdetail = {
      body: body,
      timeStamp: timestamp,
      commentByUser: commentByUser,
    };
  
    const comment = new Comment(commentdetail);
    await comment.save();
    comments[index] = comment;
    console.log(`Added comment: ${body}`);
  }

  async function postCreate(index, title, timestamp, body, postByUser, isPublished, commentsForPost) {
    const postDetail = {
      title: title,
      timestamp: timestamp,
      body: body,
      postByUser: postByUser,
      isPublished: isPublished,
      commentsForPost: commentsForPost,
    };
  
    const post = new Post(postDetail);
    await post.save();
    posts[index] = post;
    console.log(`Added post: ${title}`);
  }


  
  async function createUsers() {
    console.log("Adding users");
    await Promise.all([
        userCreate(0, "Alice Smith", "alicesmith@gmail.com", "Password123!", false, true),
        userCreate(1, "John Doe", "johndoe@gmail.com", "SecurePass456!", false, true),
        userCreate(2, "Emma Johnson", "emmajohnson@gmail.com", "MyPass789!", true, true),
        userCreate(3, "Michael Brown", "michaelbrown@gmail.com", "SafePassword0!", true, true),
    ]);
  }
 
  async function createComments() {
    console.log("Adding messages");
    await Promise.all([
        commentCreate(0, "This article provided some new insights, thank you!", "2024-05-20T14:15:00Z", users[3]),
        commentCreate(1, "I completely disagree with your point about climate change.", "2024-05-21T09:30:00Z", users[2]),
        commentCreate(2, "Interesting perspective, but could you provide more sources?", "2024-05-21T17:45:00Z", users[1]),
        commentCreate(3, "Your writing style is very engaging. Keep up the good work!", "2024-05-22T08:20:00Z", users[0]),
        commentCreate(4, "I learned a lot from this post, thanks for sharing!", "2024-05-22T13:10:00Z", users[3]),
        commentCreate(5, "I think you missed a crucial point regarding economic impact.", "2024-05-23T11:05:00Z", users[2]),
        commentCreate(6, "Can you elaborate on the statistics mentioned?", "2024-05-23T15:30:00Z", users[1]),
        commentCreate(7, "This post was very informative, looking forward to more!", "2024-05-24T10:00:00Z", users[0]),
    ]);
  }

  async function createPosts() {
    console.log("Adding users");
    await Promise.all([
        postCreate(0, "Welcome to the Community", "2024-05-21T08:00:00Z", "We are excited to have you here. Let's make this community great!", users[2], true, [comments[0], comments[1]]),
        postCreate(1, "Question About Features", "2024-05-19T15:30:00Z", "Can anyone explain how to use the new feature?", users[2], false, [comments[2], comments[3]]),
        postCreate(2, "Issue with Login", "2024-05-17T09:20:00Z", "Is anyone else having trouble logging in today?", users[3], true, [comments[4], comments[5]]),
        postCreate(3, "Feature Request", "2024-05-15T11:10:00Z", "Could you add a search function to the forum?", users[3], false, [comments[6], comments[7]]),
    ]);
  }