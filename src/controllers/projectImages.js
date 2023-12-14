const ProjectImages = require("../models/ProjectImages");
const Project = require("../models/Project");
const { deleteFile } = require("../utils/deleteFile");

const createProjectImages = async (req, res) => {
  try {
    const { project_id } = req.body;

    const result = await ProjectImages.findOne({
      project_id,
    }).sort({ priority: "-1" });

    const files = req.files;

    const projectImages = files.map((file, index) => {
      return {
        image: file.filename,
        priority: index + (result?.priority ?? 0) + 1,
        project_id,
      };
    });

    const data = await ProjectImages.insertMany(projectImages);
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};
const getAllProjectImages = async (req, res) => {
  try {
    const { status, id, project_id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    if (project_id) filterQuery.project_id = project_id;

    const projectImages = await ProjectImages.find(filterQuery).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projectImages.length,
      data: projectImages,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteProjectImage = async (req, res) => {
  try {
    const { image_id } = req.params;

    const project = await ProjectImages.findOne({ _id: image_id });

    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project Image not found",
      });
    }

    deleteFile(project.image);

    await ProjectImages.findByIdAndDelete(image_id);

    return res.status(200).json({
      success: true,
      message: "Project Image deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updatePriority = async (req, res) => {
  try {
    const { data } = req.body;

    const bulkUpdateOperations = data.map((update) => ({
      updateOne: {
        filter: { _id: update.id },
        update: { $set: { priority: update.priority } },
      },
    }));

    const result = await ProjectImages.bulkWrite(bulkUpdateOperations);

    return res.status(200).json({
      success: true,
      data: result,
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

const updateProjectImage = async (req, res) => {
  try {
    const { status, id } = req.body;

    const projectImage = await ProjectImages.findByIdAndUpdate(
      id,
      { status, image: req.file?.filename ?? undefined },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: projectImage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};


const setProjectImageToDefault = async (req, res) => {
  try {
    const { projectImageId } = req.params;

    const projectImage = await ProjectImages.findById(projectImageId);
    const project = await Project.findById(projectImage.project_id);
    await ProjectImages.updateOne({_id : projectImage}, {image : project.image});
    await Project.updateOne({_id : project._id}, {image : projectImage.image});

    return res.status(200).json({
      success: true,
      data: projectImage,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createProjectImages,
  getAllProjectImages,
  deleteProjectImage,
  updatePriority,
  updateProjectImage,
  setProjectImageToDefault
};
