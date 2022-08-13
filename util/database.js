const Sequelize = require("sequelize");
require("dotenv").config();

//data base info from .env
const dataBase = process.env.DATABASE_NAME;
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(dataBase, user, pass, {
  dialect: "postgres",
  host: host,
  port: port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`${user} running on ~☑~  http://localhost:${port}`);
  })
  .catch((err) => {
    if (process.env.NODE_ENV === "dev") {
      console.log(err);
    } else {
      throw err;
    }
  });

module.exports = sequelize;
