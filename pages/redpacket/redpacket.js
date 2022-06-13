// pages/helpcenter/helpcenter.js
// const WxParse = require('../../wxParse/wxParse.js')
const WxParse = require('../../wxParse/wxParse')
const {getCardList} = require("../../http/api")
var app =getApp()
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
    // note:[    //瀑布流布局图片
    // {
    //   coupon: '满100减50',
    //   name: '东北烧烤',
    //   url: '../../image/2.png'
    // },
    // {
    //   coupon: '85折优惠劵',
    //   name: '老王大饭店',
    //   url: '../../image/3.png'
    // },
    // {
    //   coupon: '新客送免费招牌炸鸡',
    //   name: '韩式明洞炸鸡店',
    //   url: '../../image/4.png'
    // },
    // {
    //   coupon: '充值100减60',
    //   name: '一剪没理发店',
    //   url: '../../image/5.png'
    // },
    // {
    //   coupon: '送东北大米饭快来',
    //   name: '张师傅家常菜，很多新口味.',
    //   url: '../../image/6.png'
    // },
    // {
    //   coupon: '送东北大米饭快来尝啊',
    //   name: '张师傅家常菜，很多新口味',
    //   url: '../../image/6.png'
    // },
    // {
    //   coupon: '送东北大米饭快来',
    //   name: '张师傅家常菜，很多新口味',
    //   url: '../../image/6.png'
    // },
    //   // {
    //   //   dotask:'随 机 任 务',
    //   //   goshare:'分享群聊',
    //   //   acquire:'去完成',
    //   // }
    //   ],
      // 查询信息
      queryInfo:{
        pageSize:5,
        pageNum:1
      },
      // 卡片列表
      cardList:[],
      // 导航列表
      naviList:[],
      // 控制定时器的开关
      flag:true
  },
  timer:null,
  // imageLoad: function () {
  //   this.setData({
  //     imageWidth: wx.getSystemInfoSync().windowWidth
  //   })
  // }
  /**
   * 生命周期函数--监听页面加载
   */
     
  //  跳转到搜索页面
  gosearch: function(options){
    wx.navigateTo({
      url: '../gosearch/gosearch',
    })
  },
  gototask: function(options){
    wx.navigateTo({
      url: '../task/task',
    })
  },
  mypacket: function(options){
    wx.navigateTo({
      url: '../mypacket/mypacket',
    })
  },
  coupondetails: function(e){
    console.log(e);
    var couponTickeId = e.currentTarget.dataset.id
    // console.log(couponTickeId);
    wx.navigateTo({
      url: `../coupondetails/coupondetails?id=${couponTickeId}`,
    })
  },
  gotop:function(e){
    wx.pageScrollTo({
       scrollTop: 0,
    })
  },
  //获取券商城卡片列表
  async getList(){
    let res = await getCardList(this.data.queryInfo)
    var cList = []
    var nList =[]
    res.data.fallCardList.forEach(item => {
      if(item.fallCardType == "navigation"){
        nList.push(item)
      }else{
        cList.push(item)
      }
    })
    this.setData({
      cardList:cList
    })
    this.setData({
      naviList:nList
    })
    console.log(res);
    console.log(this.data.cardList);
    console.log(this.data.naviList);
    // console.log(this.data.cardList);
  },
  onLoad: function (options) {
    WxParse.wxParse('remark', 'html', wx.getStorageSync('remark'), this, 5); //解析
    this.getList()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(2);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 定时器
  theTimer(){
    var count = 0
    var that = this
    this.timer = setInterval(function(){
      count++
      console.log(count);
      if(count == 5){
        clearInterval(that.timer)
        console.log("任务完成");
        var obj = {
          taskId:5,
          taskStatus:'complete'
        }
        app.globalData.taskStatus = obj
        that.setData({
          flag:false
        })
      }
    },1000)
   
   
  },
  onShow: function () {
    console.log(3);
    if(this.data.flag){
      this.theTimer()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.timer)
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