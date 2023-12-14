const { Router } = require("express");
const { upload } = require("../utils/multer");
const {
  getAllMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu");
const { protect } = require("../middleware/protect");

const router = Router();

router
  .get("/", getAllMenu)
  .post("/", protect, createMenu)
  .put("/", protect, updateMenu)
  .delete("/:menu_id", protect, deleteMenu);

module.exports = router;
