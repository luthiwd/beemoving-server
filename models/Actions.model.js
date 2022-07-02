const { Schema, model } = require ('mongoose')

const actionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  },
  {
    timestamps: true,
  }

)


const Actions = model("Actions", actionsSchema)

module.exports = Actions;