const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

// 定义表
const City = sequelize.define('city', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  province: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  county: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = City;
