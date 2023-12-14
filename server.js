const express = require("express");
const connectDB = require("./src/config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./src/config/config.env" });

connectDB();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.static("./public"));

require("./src/routes/index.js")(app);

app.get("*", (req, res) => {
  return res.status(400).json({
    success: false,
    message: `Please check endPoint, not any api of this route!`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err, res) => {
  if (!err) {
    console.log(`server running on PORT ${PORT}...`.yellow.bold);
  }
});
