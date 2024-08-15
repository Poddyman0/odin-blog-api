const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {type: String, required: true},
    timestamp: { type: Date, default: Date.now },
    commentByUser: { type: Schema.Types.ObjectId, ref: "User" },
})

CommentSchema.virtual("url").get(function () {
    return `/comment/${this._id}`;
  });

CommentSchema.virtual("timestamp_formatted").get(function () {
   return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});
  
CommentSchema.virtual("timestamp_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.timestamp).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Comment", CommentSchema);