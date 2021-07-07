// pages/redpacket/redpacket.js
import wxbarcode from '../../miniprogram_npm/wxbarcode/index'
const {
  getUserRedpacket
} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redpacketList: [], //用户 未使用 红包列表
    awardDisplay: '', //奖品展示信息
    awardBarNo: '', //奖品条形码编号
    iconShow: true, //小问号详情信息的显示隐藏
    isNotUsed: false, //是否未使用 -- false默认显示 true为隐藏
    isUsed: false, //是否已使用
    isExpired: false, //是否已过期
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '请稍等...',
    })
    setTimeout(() => {
      wx.hideLoading()
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000);

    /*     wx.getSystemInfo({
          success: (result) => {
            // console.log(result.system)
            if(result.system.indexOf('iOS') != -1){
              
            }
          },
        }) */

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // console.log('onshow');
    // 用户红包列表
    getUserRedpacket({ //请求红包列表
      pageSize: 1,
      pageNum: 1
    }).then(res => {
      let result = res.data.appUserAwardList
      if (res.data.errCode == '10001') {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        wx.hideLoading()
        return
      }
      if (result != undefined) {
        this.setData({ //赋值给遍历数组
          redpacketList: result
        })
        // 遍历判断某项是否需要显示
        result.forEach(item => {
          if (item.status == 1) { //是否有未使用数据
            this.setData({
              isNotUsed: true,
            })
          } else if (item.status == 2) { //是否有已使用数据
            this.setData({
              isUsed: true,
            })
          } else if (item.status == 3) { //是否有已过期数据
            this.setData({
              isExpired: true,
            })
          } else {
            this.setData({
              isNotUsed: false, //是否未使用
              isUsed: false, //是否已使用
              isExpired: false, //是否已过期
            })
          }
        });
      }
    }).catch(err => {
      console.log(err)
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获得组件
    this.pupop = this.selectComponent('#pupop')
  },
  /* 立即使用--显示弹窗 */
  showPupop: function (e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.redpacketList
    for (let i = 0; i < list.length; i++) {
      if (index === i) { //当前点击的下标
        this.setData({
          awardDescription: list[i].awardDescription, //可抵扣百分之二十
          storeName: list[i].storeName, //店铺名称
          awardDisplay: list[i].awardDisplay, //￥199.00
          awardBarNo: list[i].awardBarNo, //红包编号
        })
        wxbarcode.barcode('barcode', list[i].awardBarNo, 390, 134) //条形码
      }
    }
    this.pupop.showPupop()
  },
  _btnok: function () { //确定
    this.pupop.hidePupop()
  },
  _error: function () { //关闭
    this.pupop.hidePupop()
  },

  /* 小问号的显示事件 */
  doIconShow: function (e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.redpacketList
    for (let i = 0; i < list.length; i++) {
      if (index === i) { //当前点击的下标
        this.setData({
          awardDescription: list[i].awardDescription, //可抵扣百分之二十
          storeName: list[i].storeName, //店铺名称
          awardDisplay: list[i].awardDisplay, //￥199.00
          awardBarNo: list[i].awardBarNo, //红包编号
        })
        wxbarcode.barcode('barcode', list[i].awardBarNo, 390, 134) //条形码
      }
    }
    this.setData({
      iconShow: false
    })
  },
  /* 小问号的隐藏事件 */
  doIconHidden: function () {
    this.setData({
      iconShow: true
    })
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

  /* 自定--刷新 */
  onRefresh: function () {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    this.onLoad()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.onRefresh();
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