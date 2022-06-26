const router = require("express").Router();
const uploader = require("../middlewares/uploader")
const isAuthenticated = require("../middlewares/isAutheticated")
const Hive = require("../models/Hive.model")
const Actions = require("../models/Actions.model")
const User = require ("../models/User.model")

//CREAMOS EL CRUD PARA LA CREACIÓN DE COLMENAS

//GET '/api/colmenas/' => Renderizamos todas las colmenas
router.get('/', async (req, res ,next) => {
  try {
    const foundHive = await Hive.find()
    res.json(foundHive)
  } catch (error) {
    next(error)
  }
})

//POST '/api/colmenas' => Añadimos una nueva colmena
router.post('/',uploader.single("image"), async (req, res, next) => {
  const { name, actions, image } = req.body
  try {
    const newHive = await Hive.create({
      name,
      actions,
      image
    })
    res.json(newHive)
  } catch (error) {
    next(error)
  }
})

//GET '/api/colmenas/:id' => Mostramos detalles de la colmena
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const foundHive = await Hive.findById(id).populate({
      path: 'actions',
      model: Actions,
      populate: {
        path: 'user',
        model: User,
        select: "username"
      }}).exec();
    res.json(foundHive)
  } catch (error) {
    next(error)
  }
})

//PATCH 'api/colmena/:id' => Editamos la colmena para añadir nuevos parametros
router.patch('/:id/edit',uploader.single("image"),uploader.array("imagesfiles"), async (req, res, next) => {
  const { id } = req.params
  const { name, actions, image } = req.body
  try {
    const updateHive = await Hive.finByIdAndUpdate(id,{$push:{
      actions,
    },
    name,
    image,
    imagesfiles
    },{new:true}).exec();
    res.json(updateHive)
  } catch (error) {
    next(error)
  }
})

//DELETE '/api/colmena/:id' => Borrado de la colmena
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await Hive.findByIdAndDelete(id)
    res.json ("La colmena fue eliminada")
  } catch (error) {
    next(error)
  }
})

module.exports = router;