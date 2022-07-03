const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require ('./auth.routes.js')
router.use('/auth', authRoutes)

const hiveRoutes = require ('./hive.routes')
router.use('/colmenas', hiveRoutes)

const uploaderRoutes = require("./uploader.routes.js")
router.use("/uploader", uploaderRoutes)

module.exports = router;
