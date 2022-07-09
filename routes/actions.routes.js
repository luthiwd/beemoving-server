const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAutheticated");
const Actions = require ("../models/Actions.model");


//GET '/api/actions/:id' => Detalles de la Action
router.get('/:id' , isAuthenticated, async (req, res, next) => {
  const { id } = req.params
  try {
    const actionDetails = await Actions.findById(id)
    res.json(actionDetails)
  } catch (error) {
    next(error)
  }
})

//PATCH '/api/actions/:id/edit' => Editamos la action
router.patch('/:id' , isAuthenticated, async ( req, res, next ) => {
  const { id } = req.params
  const { name, comment } = req.body
  try {
    const foundAction = await Actions.findByIdAndUpdate(id, {
      name,
      comment
    })
    res.json(foundAction)
  } catch (error) {
    next(error)
  }
})

//DELETE '/api/actions/:id' => Borrado de la colmena
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await Actions.findByIdAndDelete(id)
    res.json ("La acción fue eliminada")
  } catch (error) {
    next(error)
  }
})


module.exports = router;