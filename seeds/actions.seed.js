const actions = [

  {
    "name": "Tratamiento",
    "fecha":"",
    "user":[]
  },
  {
    "name": "Recolección",
    "fecha":"",
    
  },
  {
    "name": "Alimento",
    "fecha":"",
    
  },
  {
    "name": "Agua",
    "fecha":"",
    
  },
  {
    "name": "Revisión General",
    "fecha":"",
    
  },
  {
    "name": "Reina",
    "fecha":"",
    
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