const { Router } = require("express");
const { upload } = require("../utils/multer");
const { protect } = require("../middleware/protect");
const {
  createProjectImages,
  getAllProjectImages,
  deleteProjectImage,
  updatePriority,
  updateProjectImage, setProjectImageToDefault,
} = require("../controllers/projectImages");

const router = Router();

router
  .get("/", getAllProjectImages)
  .post("/", protect, upload.array("images"), createProjectImages)
  .put("/update-priority", protect, updatePriority)
  .put("/", protect, upload.single("image"), updateProjectImage)
  .delete("/:image_id", protect, deleteProjectImage)
  .get('/setDefault/:projectImageId', protect, setProjectImageToDefault);

module.exports = router;
