// 封装请求方式
const app = getApp()
const baseURL = 'https://lottery.sss1000.com/apitst/app'; //测试服务器
// const baseURL = 'https://lottery.sss1000.com/api/app/';  //正式服务器
let _t = wx.getStorageSync('token') //获取token令牌
let _u = wx.getStorageSync('userId') //用户唯一标识符
let _v = wx.getStorageSync('_v') //小程序版本号
let _ov = wx.getStorageSync('_ov') //手机操作系统版本号
let _om = wx.getStorageSync('_om') //手机型号

// 未获取到token和userid时 进行回调再次获取并写入缓存
if (!_t && !_u) {
  app.Callback = (_t, _u) => {
    if (_t && _u) {
      console.log('回调了,设置了token');
      _t = wx.setStorageSync('token', _t)
      _u = wx.setStorageSync('userId', _u)
    }
  }
}

let request = (url, data) => {
  return new Promise((resole, reject) => {
    wx.request({
      url: baseURL + url,
      data: JSON.stringify(data),
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        '_t': wx.getStorageSync('token'),
        '_u': wx.getStorageSync('userId'),
        '_v': _v,
        '_ov': _ov,
        '_om': _om,
      },
      // 成功回调
      success: (res) => {
        // 成功后抛出
        resole(res)
      },
      // 失败回调
      fail: () => {
        reject("请求失败!")
      }
    })
  })
}






module.exports = {
  request: request
}