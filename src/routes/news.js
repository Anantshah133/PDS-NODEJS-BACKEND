const { Router } = require("express");
const { upload } = require("../utils/multer");
const {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllNews)
  .post("/", protect, upload.single("image"), createNews)
  .put("/", protect, upload.single("image"), updateNews)
  .delete("/:news_id", protect, deleteNews);

module.exports = router;
