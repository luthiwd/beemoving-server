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

// //GET '/api/actions/:id' => Detalles de una action por id
// router.get('/:idHive/:idAction', async (req, res, next) => {
//   const { idAction } = req.params
//   try {
//     const action = await Actions.findById(idAction).populate("user")
//     res.json(action)
//   } catch (error) {
//     res.json(error)
//   }
// })

// //PATCH '/api/actions/edit' => Añadimos fecha en el date
// router.get('/edit', async (req, res, next) => {
//   const { fecha } = req.body
//   try {
//     const addFecha = await Actions.create({
//       fecha,
//     })
//     res.json(addFecha)
//   } catch (error) {
//     res.json(error)
//   }
// })



module.exports = router;