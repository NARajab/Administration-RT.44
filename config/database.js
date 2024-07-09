const Sequelize = require("sequelize");
require("dotenv").config();

const {
  DB_USERNAME = "u852092425_gadingcity",
  DB_PASSWORD = "",
  DB_NAME = "u852092425_RT44gadingcity",
  DB_HOST = "153.92.15.29",
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const databaseValidation = async () => {
  try {
    await sequelize.authenticate();
    console.log("Success connect to database");
  } catch (err) {
    console.error(`Unable to connect to the database: ${err}`);
  }
};

module.exports = {
  databaseValidation,
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
};
