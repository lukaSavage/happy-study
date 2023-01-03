/**
 * @description 定义操作数据库的方法
 */

const City = require('../db/model/city');
/*
  -- 查找所有省份
  select * from cities where level=1;
  -- 查找广东省所有城市
  select * from cities where province='44' and level=2;
  -- 查找广东省深圳市所有区县
  select * from cities where province='44' and level=3 and city="03";
*/
async function findAllCity(findOptions, filterName) {
  const cities = await City.findAll({
    // where: {
    // 查找所有省份
    // level: 1
    // 查找广东省所有城市
    // level: 2,
    // province: '44',
    // }
    where: findOptions,
    attributes: ['name', filterName]
  });
  // 返回的数据有很多，我只要dataValues
  return cities.map(city => city.dataValues);
}

module.exports = {
  findAllCity
};
