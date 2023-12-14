const Service = require("../models/Service");
const { deleteFile } = require("../utils/deleteFile");

const createService = async (req, res) => {
  try {
    const { title, status, description } = req.body;

    const service = await Service.create({
      title,
      status,
      description,
      image: req.file?.filename ?? undefined,
    });

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllService = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const services = await Service.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, status, description, id } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { title, status, description, image: req.file?.filename ?? undefined },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { service_id } = req.params;

    const service = await Service.findOne({ _id: service_id });

    if (!service) {
      return res.status(400).json({
        success: false,
        message: "service not found",
      });
    }

    deleteFile(service.image);

    await Service.findByIdAndDelete(service_id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createService,
  getAllService,
  deleteService,
  updateService,
};
