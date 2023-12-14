const Slider = require("../models/Slider");
const { deleteFile } = require("../utils/deleteFile");

const createSlider = async (req, res) => {
  try {
    const { status } = req.body;

    const slider = await Slider.create({
      status,
      image: req.file?.filename ?? undefined,
    });

    return res.status(200).json({
      success: true,
      data: slider,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllSlider = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const sliders = await Slider.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: sliders.length,
      data: sliders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateSlider = async (req, res) => {
  try {
    const { status, id } = req.body;

    const slider = await Slider.findByIdAndUpdate(
      id,
      { status, image: req.file?.filename ?? undefined },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: slider,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteSlider = async (req, res) => {
  try {
    const { slider_id } = req.params;

    const slider = await Slider.findOne({ _id: slider_id });

    if (!slider) {
      return res.status(400).json({
        success: false,
        message: "slider not found",
      });
    }

    deleteFile(slider.image);

    await Slider.findByIdAndDelete(slider_id);

    return res.status(200).json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createSlider,
  getAllSlider,
  deleteSlider,
  updateSlider,
};
