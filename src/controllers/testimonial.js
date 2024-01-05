const Testimonial = require("../models/Testimonial");
const {deleteFile} = require("../utils/deleteFile");

const createTestimonial = async (req, res) => {
    try {
        const {name, designation, review} = req.body;

        const testimonial = await Testimonial.create({
            name,
            designation,
            review,
            image: req.file?.filename ?? undefined,
        });

        return res.status(200).json({
            success: true,
            data: testimonial,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
};

const getAllTestimonial = async (req, res) => {
    try {
        const {id} = req?.query;

        const filterQuery = {};
        if (id) filterQuery._id = id;
        const testimonial = await Testimonial.find(filterQuery).sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            count: testimonial.length,
            data: testimonial,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const {testimonialId} = req.params;
        const {name, designation, review} = req.body;
        await Testimonial.findByIdAndUpdate(testimonialId, {
            name,
            designation,
            review,
            image: req.file?.filename ?? undefined,
        });
        return res.status(200).json({
            success: true,
            message: "Testimonial have been updated successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
}

const deleteTestimonial = async (req, res) => {
    try {
        const {testimonialId} = req.params;

        const testimonial = await Testimonial.findOne({_id: testimonialId});

        if (!testimonial) {
            return res.status(400).json({
                success: false,
                message: "team member not found",
            });
        }

        deleteFile(testimonial.image);

        await Testimonial.findByIdAndDelete(testimonialId);

        return res.status(200).json({
            success: true,
            message: "Team Member deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
};

module.exports = {
    createTestimonial,
    getAllTestimonial,
    updateTestimonial,
    deleteTestimonial,
};
