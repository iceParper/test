// pages/order/order.js
const { getCouponDetail , buyTicket , getBrougthInfo} = require('../../http/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleimg: '../../image/ze-shop-o Copy@1x.png',
    ordershopimg: '../../image/3.png',
     // 优惠券id
     queryInfo:{
      couponTicketId:null,
      // 订单编号
      orderNo:null
    },
    // 优惠券详情信息
    couponTicketInfo:{},
    // 购买数量
    num:1,
    // 编码
    code:"",
    // 购买信息
    buyInfo:{
      couponTicketId:null,
      buyNum:1,
    },
    // 控制是微信支付还是喵币支付
    moneyType:0
  },
  // 监听立即支付按钮触发事件
  paysuccess:async function(options){
    var that = this
    // 发起购买请求，拿到订单信息
    let res = await buyTicket(this.data.buyInfo)
    app.globalData.orderInfo = res.data.appUserOrder
    // console.log(app.globalData.orderInfo);
    // console.log(app.globalData.couponList);
    console.log(res.data);
    // 把订单号赋值给本地data
    var order='queryInfo.orderNo'
    this.setData({
      [order]:res.data.orderNo
    })
    console.log(this.data.queryInfo);
    // console.log(this.data.buyInfo);
    const payInfo = res.data.payInfo
    console.log(payInfo)
    if(payInfo !== undefined){
      wx.requestPayment(
      {
        timeStamp: payInfo.timeStamp,
        nonceStr: payInfo.nonceStr,
        package: payInfo.package,
        signType: payInfo.signType,
        paySign: payInfo.paySign,
        success (res) { 
          wx.showToast({
            title: '支付成功',
          })
          // 判断为微信支付
          that.setData({
            moneyType:2
          })
          // 进行微信支付后，生成编码
          setTimeout(function(){
            that.getBrougthInfo()
            wx.navigateTo({
              url: `../paysuccess/paysuccess?id=${that.data.queryInfo.couponTicketId}&pageType=1`,
            },1000)  
          })
          
        },
        fail (res) { 
          wx.showToast({
            title: '支付失败',
          })
          console.log(res);
        }
      }
    )
    }else{//没有进行微信支付 直接跳转
      // 判断为喵币支付
      this.setData({
        moneyType:1
      })
      this.getBrougthInfo()
      wx.navigateTo({
        url: `../paysuccess/paysuccess?id=${this.data.queryInfo.couponTicketId}`,
      })  
    }
  },
  // 获取购买后的用户优惠券详情
  async getBrougthInfo(){
    if(this.data.moneyType == 1){
    let res =await getBrougthInfo(this.data.queryInfo)
    app.globalData.couponList = res.data.appUserCouponTicketList
    this.setData({
      moneyType:0
    })
    }else if(this.data.moneyType == 2){
    let res =await getBrougthInfo(this.data.queryInfo)
    app.globalData.couponList = res.data.appUserCouponTicketList
    this.setData({
      moneyType:0
    })
    }
    // 获取购买成功后返回的优惠券编码
    console.log(app.globalData.couponList);
    // console.log(res);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取优惠券id并赋值
    var coupon = 'queryInfo.couponTicketId'
    var coupon1 = 'buyInfo.couponTicketId'
    this.setData({
      [coupon]:Number(options.id),
      [coupon1]:Number(options.id)
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
    // 加号按钮
    handleReduce(){
      if(this.data.buyInfo.buyNum <=1){
        console.log("数值小于等于1");
        return;
      }else{
        this.data.buyInfo.buyNum--;
        var numj=this.data.buyInfo.buyNum;
        var num = 'buyInfo.buyNum'
        this.setData({
          [num]:numj
        })
        console.log(this.data.buyInfo);
      }
    },
    // 减号按钮
    handleAdd(){
      this.data.buyInfo.buyNum++;
      var numa = this.data.buyInfo.buyNum;
      // console.log(numa);
      var num = 'buyInfo.buyNum'
      this.setData({
        [num]:numa
      })
      console.log(this.data.buyInfo);
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