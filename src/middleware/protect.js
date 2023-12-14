const jwt = require("jsonwebtoken");
const Setting = require("../models/Setting");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(4).json({
        success: false,
        message: "unauthorized access",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [settingData] = await Setting.find({});

    if (!settingData?.token.find((dtoken) => dtoken === token)) {
      return res.status(401).json({
        success: false,
        message: `please login again!`,
      });
    }

    req.token = token;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "unauthorized access",
    });
  }
};
