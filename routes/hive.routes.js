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
router.post('/new',uploader.single("image"), async (req, res, next) => {
  const { name, image } = req.body
  try {
    const newHive = await Hive.create({
      name,
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

//PATCH '/api/colmenas/:idHive/:idAction/deleteAction => Borramos una acción de la Hive
router.patch('/:idHive/:idAction/deleteAction', isAuthenticated, async (req, res, next) => {
  const { idHive, idAction } = req.params;
  try {
    await Hive.findByIdAndUpdate(idHive, {
      $pull: { actions: idAction }
    })
    res.json("Acción eliminada")
  } catch (error) {
    next(error)
  }
})


// PATCH ‘/api/cajas/:id/edit’ -> Editamos Colmena para añadir nueva actions e imagenes uploader.array("imagesfiles") 
router.patch("/:id/action",isAuthenticated,  async (req, res, next) => {
  const { id } = req.params;
  const { name, comment } = req.body
  const { _id } = req.payload
  
  try {
    
    const newAction = await Actions.create({
      name: name,
      user: _id,
      comment
    })
    await Hive.findByIdAndUpdate(id, {
      $push: {"actions": newAction},
      //$push: {"imagesfiles": imagesfiles},
    },{new:true});
    res.status(200).json("Añadida nueva Acción")
  } catch (error) {
    next(error);
  }
});

//PATCH 'api/colmena/:id' => Editamos la colmena para añadir nuevos parametros
router.patch('/:id',isAuthenticated, uploader.single("image"), async (req, res, next) => {
  const { id } = req.params
  const { name, image } = req.body
  try {
    const updateHive = await Hive.findByIdAndUpdate(id,{
    name,
    image,
    },{new:true});
    res.status(200).json(updateHive)
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