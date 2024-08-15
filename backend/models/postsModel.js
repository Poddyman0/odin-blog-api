const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    timestamp: { type: Date, default: Date.now },
    body: {type: String, required: true},
    postByUser: { type: Schema.Types.ObjectId, ref: "User" },
    isPublished: {type: Boolean, required: true},
    commentsForPost: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

PostSchema.virtual("url").get(function () {
    return `/blog/post/${this._id}`;
  });

PostSchema.virtual("timestamp_formatted").get(function () {
   return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});
  
PostSchema.virtual("timestamp_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.timestamp).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Post", PostSchema);