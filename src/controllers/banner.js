const Banner = require("../models/Banner");
const { deleteFile } = require("../utils/deleteFile");

const createBanner = async (req, res) => {
  try {
    const { title, status, isVideo =false } = req.body;

    const banner = await Banner.create({
      title,
      status,
      isVideo,
      image: req.file?.filename ?? undefined,
    });

    return res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const banners = await Banner.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { title, status, isVideo, id } = req.body;

    const banner = await Banner.findByIdAndUpdate(
      id,
      { title, status, image: req.file?.filename ?? undefined, isVideo },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { banner_id } = req.params;

    const banner = await Banner.findOne({ _id: banner_id });

    if (!banner) {
      return res.status(400).json({
        success: false,
        message: "Banner not found",
      });
    }

    deleteFile(banner.image);

    await Banner.findByIdAndDelete(banner_id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createBanner,
  getAllBanner,
  deleteBanner,
  updateBanner,
};
