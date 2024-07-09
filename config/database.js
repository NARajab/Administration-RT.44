const Sequelize = require("sequelize");

const {
  DB_USERNAME = "",
  DB_PASSWORD = "",
  DB_NAME = "",
  // DB_HOST = "localhost",
  // DB_PORT = "3306",
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  // host: DB_HOST,
  // port: DB_PORT,
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
    // host: DB_HOST,
    // port: DB_PORT,
    dialect: "mysql", // use 'mysql' for MySQL
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    // host: DB_HOST,
    // port: DB_PORT,
    dialect: "mysql", // use 'mysql' for MySQL
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    // host: DB_HOST,
    // port: DB_PORT,
    dialect: "mysql", // use 'mysql' for MySQL
  },
};
