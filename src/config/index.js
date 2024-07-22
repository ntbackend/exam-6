require("dotenv/config");

const { env } = process;

const config = {
  port: +env.PORT,
  databaseUrl: env.DATABASE,
  jwtSecretKey: env.JWT_SECRET,
  jwtExpression: env.JWT_EXPIRES_IN,
};

module.exports = config;
