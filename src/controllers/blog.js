const Blog = require("../models/Blog");
const { deleteFile } = require("../utils/deleteFile");

const createBlog = async (req, res) => {
  try {
    const { title, status, description, shortDescription } = req.body;

    const blog = await Blog.create({
      title,
      status,
      description,
      image: req.file?.filename ?? undefined,
      shortDescription,
    });

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const blogs = await Blog.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, status, description, id, shortDescription } = req.body;

    const blog = await Blog.findByIdAndUpdate(
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
      data: blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    const blog = await Blog.findOne({ _id: blog_id });

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "blog not found",
      });
    }

    deleteFile(blog.image);

    await Blog.findByIdAndDelete(blog_id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createBlog,
  getAllBlog,
  deleteBlog,
  updateBlog,
};
