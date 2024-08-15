const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const User = require('./models/usersModel');
const asyncHandler = require("express-async-handler");
const cors = require('cors')
const session = require("express-session");
const flash = require('connect-flash')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
const indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog');
const usersRouter = require('./routes/users');
require('dotenv').config()



const app = express();
// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
//app.use(passport.session());
/*
//added below
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ usernameEmail: username }).catch(err => done(err));
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  })
);


//sending data to be stored:
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// recieveing stored data:
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});
//aded above
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

console.error(err.stack);

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);


module.exports = app;