// pages/checkdetails/checkdetails.js
const {getCouponInfo,getCouponDetail,writeOffTicket} =require('../../http/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    packetimg: '../../image/riFill-coupon-3-fill Copy 3@1x.png',
    lightImg:'../../image/riFill-coupon-3-fill Copy 2@1x.png',
    showModal: false,  //显示modal弹窗
    single: false,  //显示两个按钮，如果想显示一个则将false改成true即可
    // 查询信息
    queryInfo:{
      couponTicketId:null,
      userTicketId:null,
      consumptionMoney:null
    },
    // 核销优惠券信息
    ticketInfo:{},
    // 优惠券其他信息
    barCodeAndStatus:{},
    // 消费金额
    sum:0,
    // 输入框绑定内容
    inputValue: 0,
    // 优惠金额
    discountAmount:0,
    // 所需支付
    toPay:0
  },
  // 显示弹窗
  checkpaysum:function(){
    this.setData({
      showModal:true,
    })
    console.log(this.data.queryInfo);
  },
  // 发送请求
  async handleRequest(){
    let res = await writeOffTicket(this.data.queryInfo)
    console.log(res);
  },
  // 触发父组件自定义事件
  modelconfirm(){
    this.triggerEvent('confirm')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var couponId = 'queryInfo.couponTicketId'
    var userId = 'queryInfo.userTicketId'
    this.setData({
      [couponId] : options.id,
      [userId] : options.uid,
    })
    console.log(this.data.queryInfo);
    // 获取当前账号
    this.modal = this.selectComponent('#modal') // 获得弹窗组件
   
    // this.getCouponTicketInfo()
    // 获取优惠券信息
    this.getCodeAndStatus()
    
  },
  // 实时获取输入框内的金额
  handleInput(e){
    // 展示的消费金额赋值
    this.setData({
      sum:e.detail.value
    })
    // 提交的消费金额赋值
    var consumptionMoney = 'queryInfo.consumptionMoney'
    this.setData({
      [consumptionMoney]:e.detail.value
    })
    // 当优惠券为满减券
    if(this.data.barCodeAndStatus.couponTicket.ticketCategoryType == "FULLDISCOUNT"&&this.data.sum>=this.data.barCodeAndStatus.couponTicket.fullMoney){
      // 算出所需支付的金额展示
      var money = this.data.sum - this.data.barCodeAndStatus.couponTicket.reduceMoney
      console.log(money);
      // 展示优惠金额的赋值和所需付费金额的赋值
      this.setData({
        discountAmount:this.data.barCodeAndStatus.couponTicket.reduceMoney,
        toPay:money
      })
    }else{
      // 不满足优惠条件时，所需支付金额和优惠金额
      this.setData({
        toPay:this.data.sum,
        discountAmount:0
      })
    }
    // 当优惠券为折扣券
    if(this.data.barCodeAndStatus.couponTicket.ticketCategoryType == "DISCOUNT"){
      // 算出所需支付的金额展示
      var money = Number(this.data.sum) / this.data.barCodeAndStatus.couponTicket.discount/100
      console.log(money);
      var discount = this.data.sum -money
      // 展示优惠金额的赋值和所需付费金额的赋值
      this.setData({
        discountAmount:discount,
        toPay:money
      })
    }
  
  },
  // 获取核销优惠券信息
  async getCouponTicketInfo(){
    let res =await getCouponDetail(this.data.queryInfo)
    this.setData({
      ticketInfo:res.data
    })
    console.log(this.data.ticketInfo);
  },
  // 获取优惠券使用情况和编码
  async getCodeAndStatus(){
    let res = await getCouponInfo(this.data.queryInfo)
    this.setData({
      barCodeAndStatus:res.data
    })
    // 如果优惠券已核销，展示支付情况
    if(this.data.barCodeAndStatus.appUserCouponTicket.status == "writtenoff"){
      // 赋值消费情况和优惠情况
      this.setData({
        sum:this.data.barCodeAndStatus.appUserCouponTicket.consumptionMoney,
        discountAmount:this.data.barCodeAndStatus.appUserCouponTicket.discountMoney,
        toPay:this.data.barCodeAndStatus.appUserCouponTicket.payMoney
      })
    }
    console.log(this.data.barCodeAndStatus);
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