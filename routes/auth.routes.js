const router = require("express").Router();
const UserModel = require('../models/User.model.js')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require ('../middlewares/isAutheticated')
//... nuestras 3 routas de AUTH

// POST "api/auth/signup" => registrar un usuario
router.post('/signup', async (req, res, next) => {

  const { email, password, username } = req.body

  //VALIDACIONES DE BACKEND
  //* PODRIAMOS HACER LA FUNCIONALIDAD MÁS COMPLEJA TENIENDO DOS CHECKEOS SEPARADOS, EMAIL Y USERNAME
  if (!email || !password || !username){
    res.status(400).json({ errorMessage: "Los campos no estan completos" })
    return;// NO CONTINUES CON LA FUNCIÓN
  }

  // AQUI PODRIA HABER OTRAS VALIDACIONES COMO COMPLEJIDAD DE LA CONTRASEÑA O FORMATO DE EMAIL
  //! MUY IMPORTANTE IMPLEMENTAR EN EL PROYECTO

  try {
    
    const foundUser = await UserModel.findOne({email})
    if (foundUser !== null){
      res.status(400).json({errorMessage: "Usuario ya registrado"})
      return;
    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    await UserModel.create({username, 
      email, 
      password: hashPassword
    })

    res.json('Todo bien, usuario creado')

  } catch (error) {
    next(error)    
  }


})

// POST "/api/auth/login" => VERIFICAR CREDENCIALES DEL USUARIO Y ABRIRLE "SESIÓN"
router.post('/login', async (req, res, next) => {

  const { email, password } = req.body

  // TODAS LAS VALIDACIONES DE BACKEND NO SE OLVIDEN

  try {
    
    const foundUser = await UserModel.findOne({email})
    if (foundUser === null) {
      res.status(400).json({errorMessage: "Usuario no registrado"})
      return;
    }

    //EL USUARIO HA SIDO VALIDADO
    const passwordMatch = await bcryptjs.compare(password, foundUser.password)
    // console.log(passwordMatch) //TRUE O FALSE 

    if(passwordMatch === false) {
      res.status(401).json({errorMessage:"La contraseña no es correcta"})
      return;
    }

    //EL USUARIO ES QUIEN DICE SER. Y TIENE SUS CREDENCIALES CORRECTAS

    // AQUI ES DONDE CREAMOS UNA SESIÓN
    //PEEEEEEEERO AQUÍ ES DONDE EMPEZAMOS A IMPLEMENTAR EL NUEVO SISTEMA DE AUTH. SISTEMA DE TOKENS

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username
    } //! SE RECOMINEDA NO GUARDAR LA CONTRASEÑA
      //! SI HUBIESE PROPIEDADES DE ISADMIN O ISVIP SE RECOMIENDA AGREGARLAS PARA NAVEGACION

    const authToken = jwt.sign( //SE CREA LOCALMENTE NO NECESITA EL AWAIT
      payload,
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "12h" }
    )
    res.json ({authToken:authToken})

  } catch (error) {
    next(error)
  }
})

// GET '/api/auth/verify' => CHEQUEA QUE EL TOKEN ES VALIDO, LA RUTA SE USA PARA FLUJO DE FRONTEND
router.get('/verify',isAuthenticated, (req, res, next) => {

  //CHEQUEAR QUE EL TOKEN ES VALIDO
  //ENVIAR AL FRONTEND LA INFO DEL USUARIO DEL TOKEN
  //console.log(req.payload)//!ESTO ES EL req.session.user de M3
  //console.log("Pasando por la ruta, todo bien con el middleware")
  res.json(req.payload)


})

module.exports = router;