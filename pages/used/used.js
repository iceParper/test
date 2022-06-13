// pages/used/used.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packetimg: '../../image/riFill-coupon-3-fill Copy 3@1x.png',
    switchimg: '../../image/if-rotation Copy@1x.png',
    scancodesimg: '../../image/7.png',
    chevronright: '../../image/if-tasks-alt Copy@1x.png',
  },
  shopdetail: function(options){
    wx.navigateTo({
      url: '../shopdetail/shopdetail',
    })
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