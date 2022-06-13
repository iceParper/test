// pages/check/check.js
const {
  getWriteoffList
} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 核销优惠券查询信息
    queryInfo:{
      keyWord:"",
      pageSize:100,
      pageNum:1
    },
    // 核销优惠券列表
    ticketList:null,
    // 输入框内容
    inputValue:null
  },
  checkdetails: function(options){
    wx.navigateTo({
      url: '../checkdetails/checkdetails',
    })
  },
  checkused: function(e){
    // console.log(e.currentTarget.dataset.id);
    var couponId = e.currentTarget.dataset.cid
    var userTicketId = e.currentTarget.dataset.uid
    wx.navigateTo({
      url: `../checkused/checkused?id=${couponId}&uid=${userTicketId}`,
    })
  },
  checkexpired: function(options){
    wx.navigateTo({
      url: '../checkexpired/checkexpired',
    })
  },
  // 获取输入电话或券码
  handleInput(e){
    var keyword = 'queryInfo.keyWord'
    this.setData({
      [keyword]:e.detail.value
    })
    console.log(this.data.queryInfo.keyWord);
  },
  // 清空输入框
  handleClear(e){
    this.setData({
      inputValue:""
    })
  },
  // 发起请求获取优惠券
 async search(){
   let res =await getWriteoffList(this.data.queryInfo)
   this.setData({
    ticketList:res.data.appUserCouponTicketList
   })
   console.log(this.data.ticketList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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