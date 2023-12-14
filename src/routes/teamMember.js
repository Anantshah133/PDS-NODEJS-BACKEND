const {Router} = require("express");
const {upload} = require("../utils/multer");
const {protect} = require("../middleware/protect");
const {createTeamMember, deleteTeamMember, getAllTeamMember, updateTeamMember} = require("../controllers/teamMember");

const teamMemberRouter = Router();

teamMemberRouter
    .get("/", getAllTeamMember)
    .post("/", protect, upload.single("image"), createTeamMember)
    .put("/:teamMemberId", protect, upload.single("image"), updateTeamMember)
    .delete("/:teamMemberId", protect, deleteTeamMember);

module.exports = teamMemberRouter;
