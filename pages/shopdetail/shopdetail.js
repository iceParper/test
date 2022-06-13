// pages/shopdetail/shopdetail.js
const {getShopDetail} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topimg:'../../image/3.png',
    details_title: '老王大饭店',
    shoptime: '../../image/md-event Copy@1x.png',
    shareimg: '../../image/fas fa-share-square Copy@1x.png',
    downimg: '../../image/if-download Copy@1x.png',
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
        coupon: '送东北大米饭快来',
        name: '张师傅家常菜，很多新口味.',
        url: '../../image/6.png'
      },
      {
        coupon: '送东北大米饭快来尝啊',
        name: '张师傅家常菜，很多新口味',
        url: '../../image/6.png'
      },
      {
        coupon: '送东北大米饭快来',
        name: '张师傅家常菜，很多新口味',
        url: '../../image/6.png'
      },
    ],
    // 商户ID
    queryInfo:{
      commericalId:null
    },
    // 商户信息
    shopInfo:{},
    // 商户相关优惠券
    shopAboutTicket:[] 
  },
  coupondetails: function(options){
    wx.navigateTo({
      url: '../coupondetails/coupondetails',
    })
  },
  goorder: function(options){
    wx.navigateTo({
      url: '../order/order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = 'queryInfo.commericalId'
    this.setData({
      [id]:options.id
    })
    this.getShopInfo()
    console.log(this.data.queryInfo.commericalId);
  },
 async getShopInfo(){
   let res =await getShopDetail(this.data.queryInfo)
   this.setData({
     // 商户信息
    shopInfo:res.data.commerical,
    // 商户相关优惠券
    shopAboutTicket:res.data.couponTicketList
   })
   console.log(this.data.shopInfo);
   console.log(this.data.shopAboutTicket);

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