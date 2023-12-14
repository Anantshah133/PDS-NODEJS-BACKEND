const { Router } = require("express");
const { upload } = require("../utils/multer");
const {
  createService,
  getAllService,
  updateService,
  deleteService,
} = require("../controllers/service");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllService)
  .post("/",protect, upload.single("image"), createService)
  .put("/",protect, upload.single("image"), updateService)
  .delete("/:service_id",protect, deleteService);

module.exports = router;
