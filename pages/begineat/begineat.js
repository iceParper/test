// pages/helpcenter/helpcenter.js
// const WxParse = require('../../wxParse/wxParse.js')
const WxParse = require('../../wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: '',
    search: '../../image/ze-search Copy@1x.png',    //搜索图片
    stick: '../../image/md-publish Copy@1x.png',    //置顶图片
    task: '../../image/riFill-calendar-check-fill Copy@1x.png',    //任务图片
    packet:'../../image/riFill-coupon-3-fill Copy@1x.png',   //劵包图片
    note:[    //瀑布流布局图片
    {
      coupon: '满100减50',
      name: '东北烧烤',
      url: '../../image/2.png'
    },
    {
      coupon: '85折优惠劵',
      name: '老王大饭店',
      url: '../../image/3.png'
    },
    {
      coupon: '新客送免费招牌炸鸡',
      name: '韩式明洞炸鸡店',
      url: '../../image/4.png'
    },
    {
      coupon: '充值100减60',
      name: '一剪没理发店',
      url: '../../image/5.png'
    },
    {
      coupon: '送东北大米饭快来尝...',
      name: '张师傅家常菜，很长...',
      url: '../../image/6.png'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxParse.wxParse('remark', 'html', wx.getStorageSync('remark'), this, 5); //解析
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