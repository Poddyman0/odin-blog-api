const User = require("../models/usersModel")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { trusted } = require("mongoose");
const passport = require("passport");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//updates like below

// GET request to login a user.
exports.user_login_get = (req, res) => {
  const requestedUser = `${req.userID}`
  console.log("req user", req.userID)
  res.json({
    userIDSignedInRead: requestedUser, 
    message: "JWT Auth Read Passed",
    //user: res.locals.currentUser
})
  /*
  console.log("reqToken in get", req.token)
    jwt.verify(req.token, 'secretKey', (err, authData) => {
      if (err) {
        console.log("get error")

          res.json({
            error: err,
            status: 403
          })
      } else {


      }
  })
  */
}
/*
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers.authorization
  console.log("bearerHeader", bearerHeader)
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
      // Split at space
      //const bearer = bearerHeader.split(' ')
      //console.log("bearer", bearer)

      // Get token from array
     // const bearerToken = bearer[1]
      //console.log("bearerToken", bearerToken)
    req.token = bearerHeader
      // Set the token
      //req.token = bearerToken
      //console.log("reqToken", req.token)

      //next middleware
      next();
  } else {
    console.log("verrify function error")
    res.json({
      status: 403
    })
  }
}
*/


  //for get requests


// POST request to login user.
exports.user_login_post = asyncHandler(async (req, res, next) => {
  try {
    console.log("Login POST request received");

  const userDB = await User.find({email: req.body.email}).exec()
  console.log("User found in database: ", userDB);

  const userEmail = `${userDB[0].email}`
  const reqUserEmail = `${req.body.email}`
  const userPassword = `${userDB[0].password}`
  const reqUserPassword = `${req.body.password}`
  if (userEmail === reqUserEmail) {
    console.log("Email match")
    if (userPassword === reqUserPassword) {
      console.log("password match")
      const userDBID = userDB[0]._id;
      const token = jwt.sign({userID: userDBID}, 'passwordKey')
      res.status(200).json({
        userIDSignInCreated: userDBID,
        userIsAuthor: userDB[0].isAuthor,
        message: "JWT Auth Creation Passed",
        token: token
    })
    } else {
      console.log("Password not found");
      res.json({ message: "Incorrect password" });
    }
  } else {
    console.log("Email not found");

    res.json({ message: "Incorrect email" });
  }
}
catch (error) {
  console.log("Error in login POST: ", error);

  next(error);
}
})





// POST request to logout user.
exports.user_logout_post = (req, res) => {
  if (res.locals.currentUser) {
    req.logout((err) => {
      if (err) {
        return next(err); // Passes any errors to the error handler
      }
      res.json("user_logout", { user: null }); // User is now logged out, so pass null
    });
  } else {
    res.json("user_logout", { user: null });
  }
};

// GET request for creating a user. NOTE This must come before route that displays user (uses id).


//POST request for creating user.
exports.user_create_post = [
    // Validate and sanitize the name field.
    body("username", "username must contain at least 1 characters")
      .trim()
      .isLength({ min: 1 })
      .withMessage("username must contain at least 1 characters")
      .escape(),
    body("email", "Email must be a valid email")
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .escape(),
    body("password", "Password must contain at least 1 characters")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Password must contain at least 1 characters")
      .escape(),
    body("isAuthor", "Author must be a boolean of either true or false")
        .isBoolean()
        .withMessage("Author must be a boolean of either true or false")
        .escape(),
    body("isNormalUser", "Normal User must be a boolean of either true or false")
        .isBoolean()
        .withMessage("Normal User must be a boolean of either true or false")
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAuthor: req.body.isAuthor,
        isNormalUser: req.body.isNormalUser,
      })

      // Create a genre object with escaped and trimmed data.

      
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.json({
          user: newUser,
          errors: errors.array(),
          msg: "errors",
        });
      } else {
          await newUser.save();
          res.json({
              user: newUser,
              msg: "User Created Successfully",
          });

        }
    }),
  ];
  
