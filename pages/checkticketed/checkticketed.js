// pages/checkdetails/checkdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packetimg: '../../image/riFill-coupon-3-fill Copy 3@1x.png',
    showModal: false,  //显示modal弹窗
    single: false,  //显示两个按钮，如果想显示一个则将false改成true即可
  },

  checkpaysum:function(){
    this.setData({
      showModal:true,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.modal = this.selectComponent('#modal') // 获得弹窗组件
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