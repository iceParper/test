// pages/task/task.js
const {
  taskQuery,modifyTaskStatus
} = require('../../http/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    fishimg: '../../image/图片 4 Copy@1x.png',
    plan_img_one: '../../image/图片 Copy@1x.png',
    plan_img_tow: '../../image/图片 3 Copy@1x.png',
    loginday_img: '../../image/fas fa-check Copy@1x.png',
    browse_img: '../../image/md-visibility Copy@1x.png',
    sharefriend_img: '../../image/md-share Copy@1x.png',
    sharegroup_img: '../../image/md-group Copy@1x.png',
    getshare_img: '../../image/fas fa-user-plus Copy@1x.png',
    goshopping_img: '../../image/fas fa-shopping-bag Copy@1x.png',
    queryInfo: {
      pageSize: 5,
      pageNum: 1
    },
    // 任务ID
    taskId:null,
    // 获取的任务列表
    taskList: [],
    // 任务状态
    taskStatus: ['去完成', '领取', '已完成'],
    storeNo:null, //店铺号
    userId: null, //用户id
    taskNewStatus:[], //任务新状态
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    // console.log(app.globalData.taskFlag);
    // if(app.globalData.taskFlag){
    //   var obj = {
    //     taskId:4,
    //     taskStatus:'complete'
    //   }
    //   app.globalData.taskStatus.push(obj)
    //   app.globalData.taskFlag = false
    // }
    
    console.log(app.globalData.taskStatus);
    this.setData({
      taskNewStatus:app.globalData.taskStatus
    })
    console.log(this.data.taskNewStatus,"new");
    this.getTaskQuery()
    // 获取当前用户信息
    let sNo = wx.getStorageSync('storeNo')
    let uid = wx.getStorageSync('userId')
    this.setData({
      storeNo: sNo, //店铺号
      userId: uid, //用户id
    })
    this.modifyTask();
  },
  // 获取任务列表
  async getTaskQuery() {
    let res = await taskQuery(this.data.queryInfo)
    this.setData({
      taskList: res.data.taskList
    })
    console.log(this.data.taskList);
    console.log(res);
  },
  // 处理任务事件
  handleTask(e){
    this.setData({
      taskId:e.currentTarget.dataset.id
    })
    console.log(this.data.taskId);
    if(this.data.taskId == 5 ||this.data.taskId == 9) {
      wx.switchTab({
        url: '../redpacket/redpacket'
      })
    }
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
    this.getTaskQuery()
  },
  // 每次进入任务界面都获取新的任务列表和状态
  async modifyTask(){
    let res = await modifyTaskStatus(this.data.taskNewStatus)
    console.log(res);
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
  onShareAppMessage: function (res) {
    let sno = this.data.storeNo
    let uid = this.data.userId
    console.log(res);
    return {
      title:'喵荷包123',
      path:`pages/redpacket/redpacket?id=${uid}&sno=${sno}`,
      complete:function(){
        app.globalData.shareDraw = "complete"
        console.log(123);
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})