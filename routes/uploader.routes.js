const router = require("express").Router();

const uploader = require("../middlewares/uploader.js")

// Ruta para enviar imagen a cloudinary y recibe un URL
router.post("/", uploader.single("image"), (req, res, next) => {
    res.json(req.file.path)
})

// router.post("/", uploader.array("images"), (req, res, next) => {
//     res.json(req.files.path)
// })

module.exports = router;