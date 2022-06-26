const { Schema, model } = require ('mongoose')

const actionsSchema = new Schema(
  {
    name: [{
      type: String,
      enum: ["Tratamiento", "Recolección", "Alimento", "Agua", "Revisión General"],
      required: true
    }],
    user:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    fecha: Date 
  },
  {
    timestamps: true,
  }

)


const Actions = model("Actions", actionsSchema)

module.exports = Actions;