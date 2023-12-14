const Setting = require("../models/Setting");
const jwt = require("jsonwebtoken");

const updateSetting = async (req, res) => {
  try {
    const { about, type, user_name, password } = req.body;

    const [settingData] = await Setting.find({});
    const filename = req.file?.filename ?? undefined;

    let payload = {};
    if (type === "career") {
      payload.career = filename;
    } else if (type === "about") {
      payload = {
        about: {
          about,
          image: filename ? filename : settingData.about?.image,
        },
      };
    } else if (type === "user") {
      payload = {
        user: {
          user_name,
          password: password ? password : settingData.user?.password,
        },
      };
    } else {
      return res.status(404).json({
        success: false,
        error: "type not found",
      });
    }

    const data = await Setting.findByIdAndUpdate(settingData._id, payload, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        about: data.about,
        user_name: data.user.user_name,
        career: data.career,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};
const getSettingData = async (req, res) => {
  try {
    const [setting] = await Setting.find({});

    const updatedSetting = {
      about: setting.about,
      user_name: setting.user.user_name,
      career: setting.career,
    };

    return res.status(200).json({
      success: true,
      data: updatedSetting,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a username.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Password.",
      });
    }

    const [data] = await Setting.find({});
    const user = data.user;

    if (user_name === user.user_name && password === user.password) {
      const authToken = jwt.sign({ user_name }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1d",
      });

      await Setting.findByIdAndUpdate(
        data._id,
        { token: [...(data?.token ?? []), authToken] },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: { token: authToken },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Invalid credentials`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    if (!user_name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a username.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Password.",
      });
    }
    const data = await Setting.find({});
    if (data.length > 0) {
      return res.status(400).json({
        success: false,
        error: "User already create",
      });
    } else {
      await Setting.create({
        user: {
          user_name,
          password,
        },
      });
      return res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.token;
    const [settingData] = await Setting.find({});

    const tokenList = settingData.token.filter((dToken) => token !== dToken);

    await Setting.findByIdAndUpdate(
      settingData._id,
      { token: tokenList },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      error: "logout successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error?.message ?? "some thing went wrong",
    });
  }
};

module.exports = {
  updateSetting,
  getSettingData,
  login,
  logout,
  createUser,
};
