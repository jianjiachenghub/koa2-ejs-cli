const Sequelize = require("sequelize");

const conf = {
  host: "localhost",
  dialect: "mysql"
};

const seq = new Sequelize("sequelize_test", "root", "jjc958978", conf);

module.exports = seq;
