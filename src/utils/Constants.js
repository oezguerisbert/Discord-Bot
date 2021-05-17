const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  BOT_VERSION: 0.5,
  COMMAND_PREFIX: "!",
  BACKEND_PORT: process.env.PORT,
  DESIRED_LOCATION_FOR_VC: process.env.DESIRED_LOCATION_FOR_VC,
};
