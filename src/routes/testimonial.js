const {Router} = require("express");
const {upload} = require("../utils/multer");
const {protect} = require("../middleware/protect");
const {
    createTestimonial,
    getAllTestimonial,
    deleteTestimonial,
    updateTestimonial
} = require("../controllers/testimonial");

const testimonialRouter = Router();

testimonialRouter
    .get("/", getAllTestimonial)
    .post("/", protect, upload.single("image"), createTestimonial)
    .put("/:testimonialId", protect, upload.single("image"), updateTestimonial)
    .delete("/:testimonialId", protect, deleteTestimonial);

module.exports = testimonialRouter;
