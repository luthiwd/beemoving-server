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


// PATCH ‘/api/cajas/:id/edit’ -> Editamos Colmena para añadir actions e imagenes uploader.array("imagesfiles")
router.patch("/:id/:updateHive",isAuthenticated,  async (req, res, next) => {
  const { id, updateHive } = req.params;
  //const { imagesfiles } = req.body
  const { _id } = req.payload
  console.log(_id)
  try {
    await Hive.findByIdAndUpdate(id, {
      $push: {"actions": updateHive},
      //$push: {"imagesfiles": imagesfiles},
    },{new:true});
    await Actions.findByIdAndUpdate(updateHive,{
      $push: {"user": _id}
      
    })
    res.status(200)
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