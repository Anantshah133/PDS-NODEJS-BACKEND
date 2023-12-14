const { Router } = require("express");
const {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");
const { upload } = require("../utils/multer");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllCategory)
  .post("/", protect, upload.single("image"), createCategory)
  .put("/", protect, upload.single("image"), updateCategory)
  .delete("/:category_id", protect, deleteCategory);

module.exports = router;
