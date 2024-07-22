const express = require("express");
const {
  getByIdLessons,
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // Multer ni import qilish
const router = express.Router();

router.get("/lesson/:id", getByIdLessons);
router.get("/lesson/all", getAllLessons);
router.post(
  "/lesson/create",
  protect,
  restrictTo("admin"),
  upload.single("video"),
  createLesson
);
router.put(
  "/lesson/:id/update",
  protect,
  restrictTo("admin"),
  upload.single("video"),
  updateLesson
);
router.delete("/lesson/:id/delete", protect, restrictTo("admin"), deleteLesson);

module.exports = router;
