const { Schema, model } = require("moongose")

const commentSchema = new Schema( 
  {
    message: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    hive: {
      type: Schema.Types.ObjectId,
      ref: "Hive"
    }
  },
  {
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema)

module.exports = Comment;