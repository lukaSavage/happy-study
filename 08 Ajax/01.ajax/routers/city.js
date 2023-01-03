/**
 * @description 路由器模块。管理 城市 路由
 */
const express = require('express');
const { getProvince, getCity, getCounty } = require('../controller/city');
const Router = express.Router;
// 创建路由器实例对象
const cityRouter = new Router();

// 设置路由
cityRouter.get('/getProvince', async (req, res) => {
  // 去数据库中查找所有省份数据返回
  const result = await getProvince();
  res.json(result);
});

cityRouter.get('/getCity', async (req, res) => {
  // 去数据库中查找对应省份所有城市数据返回
  // 从请求参数解构赋值得到 province
  const { province } = req.query;
  const result = await getCity(province);
  res.json(result);
});

cityRouter.get('/getCounty', async (req, res) => {
  // 去数据库中查找对应城市所有区县数据返回
  const { province, city } = req.query;
  const result = await getCounty(province, city);
  res.json(result);
});

module.exports = cityRouter;
