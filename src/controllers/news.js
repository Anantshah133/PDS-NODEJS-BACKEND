const News = require("../models/News");
const { deleteFile } = require("../utils/deleteFile");

const createNews = async (req, res) => {
  try {
    const { title, status, description, shortDescription } = req.body;

    const news = await News.create({
      title,
      status,
      description,
      image: req.file?.filename ?? undefined,
      shortDescription,
    });

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllNews = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const news = await News.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateNews = async (req, res) => {
  try {
    const { title, status, description, id, shortDescription } = req.body;

    const news = await News.findByIdAndUpdate(
      id,
      {
        title,
        status,
        description,
        image: req.file?.filename ?? undefined,
        shortDescription,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { news_id } = req.params;

    const news = await News.findOne({ _id: news_id });

    if (!news) {
      return res.status(400).json({
        success: false,
        message: "news not found",
      });
    }

    deleteFile(news.image);

    await News.findByIdAndDelete(news_id);

    return res.status(200).json({
      success: true,
      message: "news deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createNews,
  getAllNews,
  deleteNews,
  updateNews,
};
