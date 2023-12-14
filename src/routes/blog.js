const { Router } = require("express");
const { upload } = require("../utils/multer");
const {
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllBlog)
  .post("/", protect, upload.single("image"), createBlog)
  .put("/", protect, upload.single("image"), updateBlog)
  .delete("/:blog_id", protect, deleteBlog);

module.exports = router;
