const Project = require("../models/Project");
const ProjectImages = require("../models/ProjectImages");
const { deleteFile } = require("../utils/deleteFile");

const createProject = async (req, res) => {
  try {
    const { title, status, recent, description, isBanner, category_id } =
      req.body;

    const project = await Project.create({
      title,
      image: req.file?.filename ?? undefined,
      description,
      status,
      recent,
      isBanner,
      category_id,
    });

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    let message =
      error?.message ?? "some thing went wrong" ?? "something went wrong";
    return res.status(400).json({
      success: false,
      error: message,
    });
  }
};

const getAllProject = async (req, res) => {
  try {
    const { category_id, recent, status, isBanner, id, includeImage } =
      req?.query;

    const filterQuery = category_id
      ? {
          category_id: { $in: category_id },
        }
      : {};
    if (recent) filterQuery.recent = recent;
    if (status) filterQuery.status = status;
    if (isBanner) filterQuery.isBanner = isBanner;
    if (id) filterQuery._id = id;

    const projects = await Project.find({ ...filterQuery })
      .populate({
        path: "category_id",
        select: "_id title image",
      })
      .sort({ createdAt: -1 });

    if (includeImage) {
      for (let index = 0; index < projects.length; index++) {
        const element = { ...projects[index]._doc };

        const projectImages = await ProjectImages.find({
          project_id: element._id,
        }).sort({ priority: 1 });

        projects[index] = { ...element, projectImages };
      }
    }
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, status, recent, description, isBanner, category_id, id } =
      req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        image: req.file?.filename ?? undefined,
        description,
        status,
        recent,
        isBanner,
        category_id,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    let message =
      error?.message ?? "some thing went wrong" ?? "something went wrong";

    return res.status(400).json({
      success: false,
      error: message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.params;

    const project = await Project.findOne({ _id: project_id });

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "project not found",
      });
    }

    deleteFile(project.image);

    await Project.findByIdAndDelete(project_id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createProject,
  getAllProject,
  deleteProject,
  updateProject,
};
