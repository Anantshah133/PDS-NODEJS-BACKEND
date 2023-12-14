const { Router } = require("express");
const { protect } = require("../middleware/protect");

const {
  deleteContact,
  getAllContact,
  createContact,
} = require("../controllers/contact");

const router = Router();

router
  .get("/", getAllContact)
  .post("/", createContact)
  .delete("/:contact_id", protect, deleteContact);

module.exports = router;
