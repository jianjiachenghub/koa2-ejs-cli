let { getUserInfo, createUser } = require("../service/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const doCrypto = require('../utils/cryp')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require("../model/ErrorInfo");

async function isExist({ userName }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // { errno: 0, data: {....} }
    return new SuccessModel(userInfo);
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo);
  }

  try {
    await createUser({
      userName,
      password:doCrypto(password),
      gender,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password){
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
      // 登录失败
      return new ErrorModel(loginFailInfo)
  }

  // 登录成功
  if (ctx.session.userInfo == null) {
      ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login
};
