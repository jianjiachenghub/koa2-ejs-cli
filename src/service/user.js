const { User } = require('../db/model/index')
const {formatUser} = require('./_format')

/**
 * @description 查询用户信息
 * @date 2020-04-18
 * @param {string} userName
 * @param {string} password
 * @returns 规格化查询数据格式
 */
async function getUserInfo(userName,password){
    const whereOpt = {
        userName
    }    
    if(password){
        whereOpt.password = password
    }
    const result = await User.findOne({
        attributes:['id','userName','nickName','picture','city'],
        where:whereOpt
    })
    if(result == null){
        return result
    }
    return formatUser(result.dataValues)
}

async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    const data = result.dataValues

/*     // 自己关注自己（为了方便首页获取数据）
    addFollower(data.id, data.id) */

    return data
}

module.exports = {
    getUserInfo,
    createUser
}