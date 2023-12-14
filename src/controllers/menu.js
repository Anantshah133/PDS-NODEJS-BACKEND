const Menu = require("../models/Menu");

const createMenu = async (req, res) => {
  try {
    const { title, status, link } = req.body;

    const menu = await Menu.create({
      title,
      status,
      link,
    });

    return res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const { status, id } = req?.query;

    const filterQuery = status
      ? {
          status: { $in: status },
        }
      : {};
    if (id) filterQuery._id = id;
    const menus = await Menu.find(filterQuery).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { title, status, id, link } = req.body;

    const menu = await Menu.findByIdAndUpdate(
      id,
      { title, status, link },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { menu_id } = req.params;

    const menu = await Menu.findOne({ _id: menu_id });

    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "menu not found",
      });
    }

    await Menu.findByIdAndDelete(menu_id);

    return res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  createMenu,
  getAllMenu,
  deleteMenu,
  updateMenu,
};
