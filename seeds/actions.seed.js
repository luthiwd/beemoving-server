const actions = [

  {
    "name": "Tratamiento",

  },
  {
    "name": "Recolección",

  },
  {
    "name": "Alimento",

  },
  {
    "name": "Agua",

  },
  {
    "name": "Revisión General",

  },
  {
    "name": "Reina",

  },
];

const mongoose = require("mongoose");
const Actions = require ("../models/Actions.model")

require("../db")

const addActions = async () => {
  try {
    await Actions.insertMany(actions)
    mongoose.connection.close()
  } catch (error) {
    console.error("Error connecting to the database", error)
  }
}

addActions();