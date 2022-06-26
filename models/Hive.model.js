const { Schema, model } = require ('mongoose')

const hiveSchema = new Schema(
  {
    image:{
      type: String,
      default: "https://res.cloudinary.com/djersm2h6/image/upload/v1656082259/beemoving/beemoving_avfp3t.png"
    },
    imagesfiles:[{
      type: String,
    }],
    name:{
      type: String,
      required: true
    },
    actions: [{
      type: Schema.Types.ObjectId,
      ref: "Actions"
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  },
  {
    timestamps: true,
  }

)


const Hive = model("Hive", hiveSchema)

module.exports = Hive;