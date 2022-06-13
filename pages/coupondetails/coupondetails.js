// pages/coupondetails/coupondetails.js
const { getCouponDetail } = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topimg:'../../image/3.png',
    details_title: '老王大饭店',
    money_sum: '￥30',
    money_condition:'满￥100可用',
    gobuy_sum: '￥1+50',
    gobuy_goto: '立即购买',
    shoptime: '../../image/md-event Copy@1x.png',
    shareimg: '../../image/fas fa-share-square Copy@1x.png',
    downimg: '../../image/if-download Copy@1x.png',
    // 优惠券id
    queryInfo:{
      couponTicketId:null
    },
    // 优惠券详情信息
    couponTicketInfo:{}
   
  },
  goorder: function(options){
    wx.navigateTo({
      url: `../order/order?id=${this.data.queryInfo.couponTicketId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取优惠券id并赋值
    var coupon = 'queryInfo.couponTicketId'
    this.setData({
      [coupon]:Number(options.id)
    })
    console.log(this.data.queryInfo);
    this.getCouponInfo()
  },
  // 请求优惠券详情信息
    async getCouponInfo(){
    let res = await getCouponDetail(this.data.queryInfo)
    this.setData({
      couponTicketInfo:res.data
    })
    console.log(this.data.couponTicketInfo);
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})