const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAuthor: {type: Boolean, required: true},  
    isNormalUser: {type: Boolean, required: true}
})

UserSchema.virtual("url").get(function () {
    return `/blog/user/${this._id}`;
  });

module.exports = mongoose.model("User", UserSchema);