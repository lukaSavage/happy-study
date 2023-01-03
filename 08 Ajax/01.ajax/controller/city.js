/**
 * @description 调用操作数据库的方法生成要返回响应的数据
 */
const { findAllCity } = require('../services/city');
const { SuccessModal, ErrorModal } = require('../model');

/**
 * 用来获取省份数据
 */
async function getProvince() {
  try {
    const cities = await findAllCity(
      {
        level: 1
      },
      'province'
    );

    return new SuccessModal({
      errCode: 0,
      data: cities
    });
  } catch (e) {
    console.log(e);

    return new ErrorModal({
      errCode: 1,
      message: '网络出现故障，请刷新试试'
    });
  }
}

async function getCity(province) {
  try {
    const cities = await findAllCity(
      {
        level: 2,
        province
      },
      'city'
    );

    return new SuccessModal({
      errCode: 0,
      data: cities
    });
  } catch (e) {
    console.log(e);

    return new ErrorModal({
      errCode: 1,
      message: '网络出现故障，请刷新试试'
    });
  }
}

async function getCounty(province, city) {
  try {
    const cities = await findAllCity(
      {
        level: 3,
        province,
        city
      },
      'county'
    );

    return new SuccessModal({
      errCode: 0,
      data: cities
    });
  } catch (e) {
    console.log(e);

    return new ErrorModal({
      errCode: 1,
      message: '网络出现故障，请刷新试试'
    });
  }
}

module.exports = {
  getProvince,
  getCity,
  getCounty
};
