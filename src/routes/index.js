const category = require("./category");
const project = require("./project");
const service = require("./service");
const banner = require("./banner");
const slider = require("./slider");
const blog = require("./blog");
const news = require("./news");
const menu = require("./menu");
const setting = require("./setting");
const projectImages = require("./projectImages");
const career = require("./career");
const contact = require("./contact");
const teamMember = require("./teamMember");

module.exports = function (app) {
  app.use("/category", category);
  app.use("/project", project);
  app.use("/project-images", projectImages);
  app.use("/service", service);
  app.use("/banner", banner);
  app.use("/slider", slider);
  app.use("/blog", blog);
  app.use("/news", news);
  app.use("/menu", menu);
  app.use("/career", career);
  app.use("/contact", contact);
  app.use("/team-member", teamMember)
  app.use("/", setting);
};
