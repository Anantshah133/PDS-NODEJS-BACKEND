const path = require("path");
const fs = require("fs");

const deleteFile = (filename) => {
  if (!filename) return;
  const filePath = `./public/images/${filename}`;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  return true;
};

module.exports = { deleteFile };
