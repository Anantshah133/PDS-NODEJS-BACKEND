const { Router } = require("express");
const { upload } = require("../utils/multer");
const { protect } = require("../middleware/protect");
const {
  getAllCareer,
  createCareer,
  deleteCareer,
} = require("../controllers/career");

const router = Router();

router
  .get("/", getAllCareer)
  .post("/", upload.single("image"), createCareer)
  .delete("/:career_id", protect, deleteCareer);

module.exports = router;
