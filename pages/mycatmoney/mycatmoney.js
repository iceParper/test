// pages/mycatmoney/mycatmoney.js
const {
   getMyCatMoney,  //我的喵币
   getInCatMoney,  //用户收入喵币记录
   getUseCatMoney,  //用户金币支出记录
  } = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取喵币使用记录
    catMoneyInfo: {
      pageSize:20,
      pageNum: 1,
    },
    CatMoneyLogList:[],  //全部喵币使用列表
    currentId:"1",  //默认为‘全部’
    getCatMoney:[],  //用户收入喵币记录
    mulCatMoney:[],  //用户金币支出记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search();
  },

    //tab逻辑切换
    //绑定handleTap，点击触发
  async handleTap(e){
    console.log(e);
    this.setData({
      currentId:e.currentTarget.dataset.id  
    })
    if(this.data.currentId == "2"){
     let res = await getInCatMoney({})
     console.log(res);
     this.setData({
       getCatMoney:res.data.appUserCatMoneyLogList
     })
     console.log(this.data.getCatMoney);
    }else if(this.data.currentId == "3"){
      let res = await getUseCatMoney({})
      console.log(res);
      this.setData({
        mulCatMoney:res.data.appUserCatMoneyLogList
      })
     console.log(this.data.mulCatMoney);
    }
    console.log(this.data.currentId);
  },
  //获得当前喵币数据
  async search(){
    let res = await getMyCatMoney(this.data.catMoneyInfo)
    console.log(res);
    this.setData({
      catMoneyInfo:res.data.appUserCatMoney,
      CatMoneyLogList:res.data.appUserCatMoneyLogList
    })
    console.log(this.data.CatMoneyLogList,111);
    // console.log(this.data.catMoneyInfo);
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