const Career = require("../models/Career");
const { deleteFile } = require("../utils/deleteFile");
const { sendMail } = require("../utils/sendMail");

const createCareer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const career = await Career.create({
      name,
      email,
      phone,
      image: req.file?.filename ?? undefined,
    });
    const body = `<!DOCTYPE html><html><head> <meta charset="utf-8"> <title>Contact Form</title></head><body> <table> <tr> <td><strong>Name:</strong></td> <td>${name}</td> </tr> <tr> <td><strong>Email:</strong></td> <td>${email}</td> </tr> <tr> <td><strong>Phone:</strong></td> <td>${phone}</td> </tr></table></body></html>`;
    await sendMail(body, req.file);

    return res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllCareer = async (req, res) => {
  try {
    const { id } = req?.query;

    const filterQuery = {};
    if (id) filterQuery._id = id;
    const career = await Career.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: career.length,
      data: career,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const { career_id } = req.params;

    const career = await Career.findOne({ _id: career_id });

    if (!career) {
      return res.status(400).json({
        success: false,
        message: "career not found",
      });
    }

    deleteFile(career.image);

    await Career.findByIdAndDelete(career_id);

    return res.status(200).json({
      success: true,
      message: "career deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createCareer,
  getAllCareer,
  deleteCareer,
};
