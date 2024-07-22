const { Router } = require("express");
const router = Router();
const authRoute = require("./authRoutes");
const courseRoute = require("./courseRoutes");
const lessonRoute = require("./lessonRoutes");

router.use(authRoute);
router.use(courseRoute);
router.use(lessonRoute);

module.exports = router;
