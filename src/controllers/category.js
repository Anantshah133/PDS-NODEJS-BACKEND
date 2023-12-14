const Category = require("../models/Category");
const { deleteFile } = require("../utils/deleteFile");

const createCategory = async (req, res) => {
  try {
    const { title, status, priority } = req.body;

    const category = await Category.create({
      title,
      status,
      priority,
      image: req.file?.filename ?? undefined,
    });

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    let message = error?.message ?? "some thing went wrong" ?? "something went wrong";

    if (error.code === 11000) {
      message = "Title OR Priority already exists.";
    }
    return res.status(400).json({
      success: false,
      error: message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const categories = await Category.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { title, status, priority, id } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { title, status, priority, image: req.file?.filename ?? undefined },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    let message = error?.message ?? "some thing went wrong" ?? "something went wrong";

    if (error.code === 11000) {
      message = "Title OR Priority already exists.";
    }
    return res.status(400).json({
      success: false,
      error: message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const category = await Category.findOne({ _id: category_id });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "category not found",
      });
    }

    deleteFile(category.image);

    await Category.findByIdAndDelete(category_id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
