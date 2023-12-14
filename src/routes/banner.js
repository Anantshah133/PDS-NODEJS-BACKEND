const { Router } = require("express");
const { upload } = require("../utils/multer");
const {
  getAllBanner,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/banner");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllBanner)
  .post("/", protect, upload.single("image"), createBanner)
  .put("/", protect, upload.single("image"), updateBanner)
  .delete("/:banner_id", protect, deleteBanner);

module.exports = router;
