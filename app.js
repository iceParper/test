// app.js
App({
  globalData: {
    userInfo: null,
    indexjs: '',
    needLoading: false
  },
  onLaunch(options) {
    // wx.setStorageSync('query', options.query) //获取分享人的id 和 店铺编号
    // 获取手机系统信息
    /*   const height = 
    const weight = 
    wx.setStorageSync('height', height)
    wx.setStorageSync('weight', weight)
 */
    wx.getSystemInfo({
      success: (result) => {
        wx.setStorageSync('_v', result.version) //小程序版本号
        wx.setStorageSync('_ov', result.system) //手机操作系统版本
        wx.setStorageSync('_om', result.model) //手机型号
      },
    })
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'https://lottery.sss1000.com/api/app/user/login/wx',
            method: "POST",
            data: {
              code: res.code,
              inviterId: options.query.uid, //分享人的id 
              storeNo: options.query.sno, //从分享进入获得的编号
            },
            header: {
              'content-type': 'application/json', // 默认值
              '_v': wx.getStorageSync('_v'),
              '_ov': wx.getStorageSync('_ov'),
              '_om': wx.getStorageSync('_om')
            },
            success: (result) => {
              if (result.data.errCode === "10002") {
                wx.showToast({
                  title: result.data.msg,
                  icon: 'none',
                  duration: 20000
                })
              } else {
                wx.setStorageSync('indexList', result.data)
                if (result.data.phone != null || result.data.phone != undefined || result.data.phone != '') {
                  wx.setStorageSync('userphone', result.data.phone) // 存用户手机号码
                }
                if (this.Callback) {
                  this.Callback(result.data.token, result.data.userId)
                }
                // console.log('sno:' + result.data.lotteryInfo.storeNo);
                wx.setStorageSync('storeNo', result.data.lotteryInfo.storeNo) //店铺编号
                wx.setStorageSync('token', result.data.token) //用户令牌,有效期2小时
                wx.setStorageSync('userId', result.data.userId) //用户唯一标识符
                this.globalData.indexjs.dogetUserLogin() //执行index.js的登录
              }
            },
            fail: (err) => {
              console.log(err);
            },
          })

        } else {
          console.log("获取用户登录失败:" + res.errMsg)
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },


  onShow: function (options) {
    if (this.globalData.needLoading) {
      this.onLaunch(options)
      this.globalData.needLoading = false
    }
  },


  onHide: function () {
    this.globalData.needLoading = true
  }

})