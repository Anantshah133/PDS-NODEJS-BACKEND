const { Router } = require("express");
const { upload } = require("../utils/multer");

const {
  updateSetting,
  getSettingData,
  createUser,
  login,
  logout,
} = require("../controllers/setting");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/setting", getSettingData)
  .put("/setting", protect, upload.single("image"), updateSetting)
  .post("/logout", protect, logout)
  .post("/create-user", createUser)
  .post("/login", login);

module.exports = router;
