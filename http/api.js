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
  // 核销优惠券列表
  getWriteoffList:(data) =>{
    return request('/writeoff/search/query',data)
  },
  // 核销人员确认核销
  confirmWriteOff:(data) =>{
    return request('/writeoff/modify/status',data)
  },
  // 获取任务列表
  taskQuery:(data) =>{
    return request('/task/query',data)
  },
  //获取券商城卡片列表
  getCardList:(data) =>{
    return request('/fallCard/query',data)
  },
  //获取优惠券详情
  getCouponDetail:(data) =>{
    return request('/couponTicket/detail',data)
  },
  // 购买优惠券
  buyTicket:(data) =>{
    return request('/couponTicket/buy',data)
  },
     //当前拥有喵币
  getCatMoney: (data) => {
      return request('/catMoney/detail', data)
    },
    //我的喵币
  getMyCatMoney: (data) => {
    return request('/catMoney/log/query', data)
  },
  //收入喵币
  getInCatMoney: (data) => {
    return request('/catMoney/log/income', data)
  },
  //用户金币支出记录
  getUseCatMoney: (data) => {
    return request('/catMoney/log/use', data)
  },
  // 获取优惠券列表
  getCouponTicket:(data) =>{
    return request('/couponTicket/query', data)
  },
  // 获取详情
  getCouponInfo:(data) =>{
    return request('/couponTicket/collection/detail', data)
  },
  // 获取购买后的用户优惠券详情
  getBrougthInfo:(data) =>{
    return request('/couponTicket/brougth/query', data)
  },
  // 核销优惠券
  writeOffTicket:(data) =>{
    return request('/writeoff/modify/status', data)
  },
  //  修改任务状态
  modifyTaskStatus:(data)=>{
    return request('/task/modify/status',data)
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
  getShopDetail: (data) => {
    return request('/commerical/detail', data)
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