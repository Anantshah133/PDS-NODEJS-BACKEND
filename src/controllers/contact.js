const Contact = require("../models/Contact");
const { sendMail } = require("../utils/sendMail");

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    const body = `<!DOCTYPE html><html><head> <meta charset="utf-8"> <title>Contact Form</title></head><body> <table> <tr> <td><strong>Name:</strong></td> <td>${name}</td> </tr> <tr> <td><strong>Email:</strong></td> <td>${email}</td> </tr> <tr> <td><strong>Phone:</strong></td> <td>${phone}</td> </tr> <tr> <td><strong>Message:</strong></td> <td>${message}</td> </tr> </table></body></html>`;
    await sendMail(body);

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllContact = async (req, res) => {
  try {
    const { id } = req?.query;

    const filterQuery = {};
    if (id) filterQuery._id = id;
    const contact = await Contact.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contact.length,
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { contact_id } = req.params;

    await Contact.findByIdAndDelete(contact_id);

    return res.status(200).json({
      success: true,
      message: "contact deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createContact,
  getAllContact,
  deleteContact,
};
