const errorHandler = require("../middlewares/error-handler");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("../routes");

const modules = async (app, express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.use("/api", routes);
  app.use(errorHandler);
};

module.exports = modules;
