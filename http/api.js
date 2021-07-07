/* 引入封装请求 */
const {
  request
} = require('./http');

// console.log('api:'+request);


// 基于业务封装
module.exports = {
  // 用户登录
  getUserLogin: (data) => {
    return request('/user/login/wx', data)
  },
  // 用户绑定/修改手机号
  setUserPhone: (data) => {
    return request('/user/phone/bind', data)
  },
  // 用户红包列表
  getUserRedpacket: (data) => {
    return request('/user/award/list', data)
  },
  // 抽奖
  getLuckDraw: (data) => {
    return request('/lottery/luck/draw', data)
  },
  // 轮播列表
  getRotationList: (data) => {
    return request('/lottery/rotation/list', data)
  },
  // 店铺信息
  getStoreDetail: (data) => {
    return request('/store/detail', data)
  },
  // 短信验证码
  getSmsSend: (data) => {
    return request('/sms/send', data)
  },
  // 获得奖券
  getTicket: (data) => {
    return request('/user/try/get/ticket', data)
  }
}