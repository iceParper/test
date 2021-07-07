// pages/personal/personal.js
const WxParse = require('../../wxParse/wxParse')
const {
  getSmsSend,
  setUserPhone,
  getStoreDetail
} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pupopTitle: '标题', //弹窗标题文字
    pupopBtnText: '确认', //弹窗按钮文字
    isClickItem: null, //当前点击后的弹框
    isUserInfo: false, //用户号码是否存在   --false 关闭显示
    isNotBindUserPhone: false, //未绑定手机号时将弹窗内已绑定文字隐藏
    phoneNumber: '', //客服电话
    wechatNumber: '', //客服微信
    pupopPhone: false, //当前点击的是否为修改手机号
    imageList: [
      'http://photogz.photo.store.qq.com/psc?/V14KCKTp0g6Wye/05RlWl8gsTOH*Z17MtCBzAsbjKrHp7nwnYKwJGDqPkOagLGI5Oiw4Cy7JHSIEM3BgJ8PV189Gz120a45N4bQ3Q!!/m&bo=bgETAW4BEwERADc!'
    ], //图片链接地址
    userImage: '../../image/uer-icon.png', //用户头像
    userName: '', //用户昵称
    userPhone: '', //用户手机
    userphoneval: '', //输入框手机号
    textcodeval: '', //验证码
    isSendPhonetype: false, //修改手机号的类型 false 表示绑定手机号
    description: '', //客服里的地址
    address: '', //店铺地址
    storeNo: null, //店铺号
    userId: null, //用户id
    getBindTextCode: '获取验证码',
    setTextCode: '',
    getCodeDisabled: false, //开启获取验证码按钮
  },

  /**
   * 生命周期函数--监听页面s加载
   */
  onLoad: function (options) {
    // console.log('personal onload');
    // 点击分享后--显示好友列表
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('personal onshow');
    // console.log(userphone);
    let userphone = wx.getStorageSync('userphone')
    if (userphone != '') {
      this.setData({
        userPhone: userphone,
        isNotBindUserPhone: true,
        isUserInfo: true,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '请稍等...',
      duration: 2000
    })
    this.pupop = this.selectComponent('#pupop') // 获得弹窗组件
    let sNo = wx.getStorageSync('storeNo')
    let uid = wx.getStorageSync('userId')
    getStoreDetail({ //获取店铺信息
      storeNo: sNo, //店铺编号
    }).then(res => {
      // WxParse.wxParse('address', 'html', res.data.result.address, this, 5); //解析
      this.setData({
        phoneNumber: res.data.result.customerServicePhone, //客服电话
        wechatNumber: res.data.result.customerServiceVx, //客服微信
        description: res.data.result.description, //客服中的地址
        address: res.data.result.address, //店铺地址
        storeNo: sNo, //店铺编号
        userId: uid, //用户id
        imageList: this.doHandlePicUrl(res.data.result.picUrl), //实拍图片
      })
      wx.setStorageSync('remark', res.data.result.remark)
      wx.hideLoading()
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }).catch(err => {
      console.log(err)
    })
  },
  // 将图片进行处理
  doHandlePicUrl: function (strImg) {
    strImg = strImg.split(",")
    return strImg
  },
  // 显示弹框
  showPupop: function (e) {
    this.pupop.showPupop()
    // 判断当前点击对象
    if (e.target.dataset.pupopId == '1') {
      this.setData({
        pupopTitle: '联系客服',
        pupopBtnText: '确认',
        isClickItem: 1
      })
    } else if (e.target.dataset.pupopId == '4') {
      this.setData({
        pupopTitle: '店铺地址',
        pupopBtnText: '确认',
        isClickItem: 4
      })
    } else if (e.target.dataset.pupopPhone == '2') {
      this.setData({
        pupopTitle: '更换手机号码',
        pupopBtnText: '更换手机号码',
        isClickItem: 2,
        pupopPhone: true,
        isSendPhonetype: true,
        userphoneval: '', //输入框手机号--清空
        textcodeval: '', //验证码--清空
      })
    } else if (e.target.dataset.bindphone == '1') {
      this.setData({
        pupopTitle: '绑定手机号码',
        pupopBtnText: '绑定手机号码',
        isClickItem: 2,
        pupopPhone: true,
        isSendPhonetype: false,
        isNotBindUserPhone: false,
        userphoneval: '', //输入框手机号--清空
        textcodeval: '', //验证码--清空
      })
    }
  },
  /* 获取input手机号 */
  getuserphone: function (e) {
    let phone = e.currentTarget.dataset.model
    let val = e.detail.value
    this.data[phone] = val
    this.setData({
      userphoneval: this.data[phone]
    })
  },
  /* 获取input验证码 */
  gettextcode: function (e) {
    let password = e.currentTarget.dataset.model
    let val = e.detail.value
    this.data[password] = val
    this.setData({
      textcodeval: this.data[password]
    })
  },
  /* 获取手机验证码 */
  getCode: function (e) {
    if (this.data.userphoneval == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let sum = null
    if (this.data.isSendPhonetype == false) {
      sum = 1 //绑定
    } else if (this.data.isSendPhonetype == true) {
      sum = 2 //修改
    }
    getSmsSend({
      userPhone: this.data.userphoneval,
      operateType: sum, // 1 为绑定手机号, 2 修改手机号
    }).then(res => {
      if (res.data.errCode === '10002') {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '验证码已发送',
          icon: 'none',
          duration: 2000
        })
        this.doConutDown() //开启倒计时
      }
    }).catch(err => {
      console.log(err)
    })
  },

  /* 倒计时 */
  doConutDown: function () {
    this.setData({
      setTextCode: 60
    })
    // if (this.data.userPhone != '') {
    //   clearInterval(time)
    // }
    let time = setInterval(() => {
      this.data.setTextCode--
      if (this.data.setTextCode < 0) {
        this.setData({
          getCodeDisabled: false //开启按钮
        })
        clearInterval(time)
        return
      } else {
        this.setData({
          setTextCode: this.data.setTextCode,
          getCodeDisabled: true //禁用按钮
        })
      }
    }, 1000);
  },


  /*  确认弹窗 */
  _success: function (e) {
    if (this.data.pupopPhone === true) {
      // 绑定/修改手机号
      setUserPhone({
        userPhone: this.data.userphoneval,
        verifyCode: this.data.textcodeval,
      }).then(res => {
        if (this.data.userphoneval == '') {
          wx.showToast({
            title: '请输入手机号',
            icon: "none"
          })
          return
        } else if (this.data.textcodeval == '') {
          wx.showToast({
            title: '请输入验证码',
            icon: "none"
          })
          return
        } else if (res.data.errCode) { //已经过期
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        } else {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('userphone', this.data.userphoneval) //更新缓存的手机号
          wx.setStorageSync('needBindPhone', 0)
          this.setData({ //更新当前显示手机号
            userPhone: this.data.userphoneval,
            isUserInfo: true, //cun
            getCodeDisabled: false, //开启按钮
            getBindTextCode: '获取验证码',
            setTextCode: '' //绑定成功后停止读秒
          })
          this.pupop.hidePupop()
          this.data.pupopPhone = false
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      //确定
      this.pupop.hidePupop()
    }
  },
  // 关闭弹窗
  _error: function () {
    this.pupop.hidePupop()
    this.data.pupopPhone = false //解决点击更改手机后不能关闭弹窗的问题
  },


  /* 预览图片事件 */
  dopreviewImg: function (e) {
    let current = e.target.dataset.src
    // 原生预览图片的方法
    wx.previewImage({
      current: current, //当前预览图片路径
      urls: this.data.imageList, //图片的列表
    })
  },

  /* 跳转到帮助中心页面 */
  gohelpcenter: function () {
    wx.navigateTo({
      url: '../helpcenter/helpcenter',
    })
  },

  /* 分享小程序 */
  onShareAppMessage: function (e) {
    let sno = this.data.storeNo
    let uid = this.data.userId
    return {
      title: '分享',
      path: '/pages/index/index?uid=' + uid + '&sno=' + sno,
      success: function (res) {
        console.log(res);
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
      },
    }
  },

  /* 拨打客服电话 */
  docallPhone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber,
    })
  },

  /* 复制客服微信 */
  docopy: function () {
    wx.setClipboardData({ //设置复制的内容
      data: this.data.wechatNumber, //设置需要复制的内容
      success: res => {
        wx.getClipboardData({ //获取要复制的内容
          success: (option) => {
            wx.showToast({
              title: '已复制该内容',
              icon: 'success',
              duration: 2000
            })
          },
        })
      }
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
 /*  onRefresh: function () {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    this.onReady()
    let userphone = wx.getStorageSync('userphone')
    if (userphone != '') {
      this.setData({
        userPhone: userphone,
        isNotBindUserPhone: true,
        isUserInfo: true,
      })
    } else {
      this.setData({ //关闭显示用户手机号
        isUserInfo: false
      })
    }
  }, */

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
 /*  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.onRefresh();
  }, */

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})