/**
 * @description 用来连接mysql数据库
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ajax', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
