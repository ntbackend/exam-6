const express = require("express");
const {
  getByIdCourses,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

router.get("course/:id", getByIdCourses)
router.get("/course/all", getAllCourses);
router.post(
  "/course/create",
  protect,
  restrictTo("admin"),
  upload.single("photo"),
  createCourse
);
router.put(
  "/course/:id/update",
  protect,
  restrictTo("admin"),
  upload.single("photo"),
  updateCourse
);
router.delete("/course/:id/delete", protect, restrictTo("admin"), deleteCourse);

module.exports = router;
