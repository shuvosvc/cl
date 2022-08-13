const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Authority = sequelize.define("authority", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = Authority;
