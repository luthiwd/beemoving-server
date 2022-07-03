const router = require("express").Router();
const Actions = require ("../models/Actions.model")

//GET '/api/actions/' => Renderizamos todas las acciones
router.get('/', async ( req, res, next ) => {
  try {
    const allActions = await Actions.find()
    res.json(allActions)
  } catch (error) {
    res.json(error)
  }
})

module.exports = router;