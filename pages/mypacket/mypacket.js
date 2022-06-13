// pages/mypacket/mypacket.js
const { getCouponTicket } = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleimg: '../../image/ze-shop-o Copy@1x.png',
    currentId:'',
    queryInfo:{
      pageSize:10,
      pageNum:1
    },
    // 券包列表
    couponList:[]
  },

  paysuccess: function(e){
    // console.log(e.currentTarget.dataset.cid);
    // console.log(e.currentTarget.dataset.uid);
    var couponId = e.currentTarget.dataset.cid
    var uTicketId = e.currentTarget.dataset.uid
    wx.navigateTo({
      url: `../paysuccess/paysuccess?id=${couponId}&uid=${uTicketId}&pageType=2`,
    })
  },
  handleTap(e){
    // console.log(e);
    this.setData({
      currentId:e.currentTarget.dataset.id
    })
    console.log(this.data.currentId);
  },
  used: function(options){
    wx.navigateTo({
      url: '../used/used',
    })
  },
  expired: function(options){
    wx.navigateTo({
      url: '../expired/expired',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentId:options.id
    })
    this.getList()
  },
  async getList(){
    let res =await getCouponTicket(this.data.queryInfo)
    console.log(res);
    this.setData({
      couponList:res.data.appUserCouponTicketList
    })
    console.log(this.data.couponList);
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