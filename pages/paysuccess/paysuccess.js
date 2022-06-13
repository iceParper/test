// pages/paysuccess/paysuccess.js
const app = getApp()
const { getCouponDetail,getCouponInfo } = require('../../http/api')
import wxbarcode from '../../miniprogram_npm/wxbarcode/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packetimg: '../../image/riFill-coupon-3-fill Copy 2@1x.png',
    switchimg: '../../image/if-rotation Copy@1x.png',
    scancodesimg: '../../image/7.png',
    chevronright: '../../image/if-tasks-alt Copy@1x.png',
    pupopTitle: '标题', //弹窗标题文字
    pupopBtnText: '确定', //弹窗按钮文字
    isClickItem: null, //当前点击后的弹框
    // 优惠券编码
    codeNo:"",
    // 控制切换二维码和条形码
    switchNo:1,
    queryInfo:{
    // 优惠券ID
    couponTicketId:null,
    // 用户优惠券id
    userTicketId:null

    },
    // 订单信息
    orderInfo:{
    },
    // 购买的优惠券信息列表
    couponList:[],
    // 优惠券详情
    couponInfo:{},
    // 控制页面类型
    pageType:null,
    // 券包进入的优惠券详情
    pageTwoCouponList:{}
  },
  shopdetail: function(options){
    wx.navigateTo({
      url: `../shopdetail/shopdetail?id=${this.data.couponInfo.commerical.commericalId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var uTicketId = 'queryInfo.userTicketId'
    this.setData({
      [uTicketId]:Number(options.uid)
    })
    // console.log(typeof this.data.userTicketId,312321);
    // 赋值页面类型
    this.setData({
      pageType:options.pageType
    })
    // console.log(this.data.pageType,123);

    var coupon = 'queryInfo.couponTicketId'
    // 把优惠券id赋值给本地data
    this.setData({
      [coupon]:Number(options.id),
    })
    console.log(this.data.queryInfo.couponTicketId);
    this.getList()
    
    // console.log(this.data.orderInfo);

    if(this.data.pageType == '2'){
      this.getDetail()
    }
  },
  // 获取优惠券信息
  async getList(){
    let res =await getCouponDetail(this.data.queryInfo)
    this.setData({
      couponInfo:res.data
    })
    console.log(this.data.couponInfo);
  },
  // 获取详情
  async getDetail(){
   let res = await getCouponInfo(this.data.queryInfo)
   console.log(res,23123123);
   this.setData({
     pageTwoCouponList:res.data
   })
   console.log(this.data.pageTwoCouponList);
  },
  handleSwitch(){
    if(this.data.switchNo == 1){
      this.setData({
        switchNo:2
      })
    }else{
      this.setData({
        switchNo:1
      })
    }
    console.log(this.data.switchNo);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pupop = this.selectComponent('#pupop') // 获得弹窗组件
    let sNo = wx.getStorageSync('storeNo')
    let uid = wx.getStorageSync('userId')
 
    if(this.data.pageType == 2 ){
      var that = this
      setTimeout(function(){
        console.log(that.data.pageTwoCouponList);
      wxbarcode.qrcode('qrcode',that.data.pageTwoCouponList.appUserCouponTicket.barCodeNo,298,298)
    wxbarcode.barcode('barcode',that.data.pageTwoCouponList.appUserCouponTicket.barCodeNo,400,200)
      },200)
     
    }else{
      // 将全局变量下的优惠券信息和优惠券详情赋值给本地data
    this.setData({
      orderInfo:app.globalData.orderInfo,
      couponList:app.globalData.couponList
    })
    // console.log(app.globalData.couponList);
    console.log(this.data.couponList);
    wxbarcode.qrcode('qrcode',this.data.couponList[0].barCodeNo,298,298)
    wxbarcode.barcode('barcode',this.data.couponList[0].barCodeNo,400,200)
    }
   
  },

  //显示弹窗
  showPupop:function(e){
    this.pupop.showPupop()
    //判断当前点击对象
      this.setData({
        pupopTitle: '还需支付',
        pupopBtnText: '确定',
        isClickItem: 1
      })
  },
    // 关闭弹窗
    _error: function () {
      this.pupop.hidePupop()
      this.data.pupopPhone = false //解决点击更改手机后不能关闭弹窗的问题
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