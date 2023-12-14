const { Router } = require("express");
const { upload } = require("../utils/multer");
const {
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllProject)
  .post("/", protect, upload.single("image"), createProject)
  .put("/", protect, upload.single("image"), updateProject)
  .delete("/:project_id", protect, deleteProject);

module.exports = router;
