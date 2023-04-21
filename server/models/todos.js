const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

const Todo = sequelize.define("todo", {
  item: Sequelize.STRING,
});

module.exports = { Todo };