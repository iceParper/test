// pages/index/index.js
const WxParse = require('../../wxParse/wxParse');
const app = getApp()
const {
  getLuckDraw,
  getSmsSend,
  setUserPhone,
  getUserRedpacket,
  getTicket,
  getRotationList
} = require('../../http/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageBg: '../../image/bg.png', //页面背景
    rouletteBgImg: '../../image/turntable.png', //轮盘图片
    roundPointer: '', //指针图片
    animationData: '', //转盘滚动动画
    // random: '', //随机数
    // trasn: 0, //转的角度
    isflg: false, //控制内容显隐式来控制按钮个数--获奖提示弹框
    isflgId: null, //判断当前显示弹窗内容 0-活动弹窗, 1-中奖弹窗, 2-更换手机弹窗
    popuptitle: '中奖提示', //弹窗标题
    popupbtn: '按钮', //弹窗按钮内容
    isShowTitle: true, //是否显示弹窗的标题
    isActiveBtn: false, //是否为活动说明的确认按钮
    wininfoArray: [{ //获奖信息展示    
        phone: '136****9128',
        diffDateStr: '刚刚',
        awardLevel: '2',
        awardName: '喵市红包99元'
      },
      // {
      //   phone: '159****8512',
      //   diffDateStr: '两小时前',
      //   awardLevel: '1',
      //   awardName: '喵市红包69元'
      // },
      // {
      //   phone: '178****2572',
      //   diffDateStr: '13小时前',
      //   awardLevel: '1',
      //   awardName: '喵市红包199元'
      // }, {
      //   phone: '130****2629',
      //   diffDateStr: '一天前',
      //   awardLevel: '3',
      //   awardName: '喵市红包69元'
      // }
    ],
    fishList: [],
    lotteryInfoObj: {}, //活动的基本信息
    luckDrawList: {}, //抽奖信息
    awardName: '', //中奖名称
    awardDisplay: '', //账户内有红包时的中奖信息 $99.00
    userphone: '', //用户手机号
    textcode: '', //验证码
    setTextCode: '',
    isDisabled: false, //是否开启抽奖按钮
    luckDrawBtnText: '喂「喵喵」小鱼     立即抽奖', //抽奖按钮的文字
    needBindPhone: 0, //用户是否登录  0 不需要 , 1需要
    prizeImg: undefined, //中奖图片
    storeNo: null, //店铺号
    userId: null, //用户id
    lotteryDescription: '暂无活动上线', //活动说明文本
    getBindTextCode: '获取验证码',
    getCodeDisabled: false, //开启获取验证码按钮
    ticketNum: 0, //奖券数
    ani: null, //鱼的动画
    anis: null, //鱼的动画
    anifishList: '', //鱼的动画
    winHei: 0, //轮盘的宽度
    screenHei: 0, //轮盘的高度
    dayLimitNum: 0,
    todayUsedNum: 0,
    isClick: false,
    oldAward: {},
    deadfish: 7, // 渲染死鱼
    isTicketFlg: false,
    ticketLoding: '', //获取票数定时器
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      screenHei: wx.getSystemInfoSync().screenHeight,
      winHei: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight
    })
    app.globalData.indexjs = this //将index的指向保存下来
    // 打开可分享权限
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: function () {


    /*     this.setData({
          screenHei: wx.getStorageSync('height'),
          winHei: wx.getStorageSync('weight')
        }) */

    /*
            if (app.globalData.needLoading) {
              this.dogetUserLogin()
            }
         */

    // 从个人页面绑定回来修改手机状态
    let userphone = wx.getStorageSync('userphone')
    if (userphone != '') {
      this.setData({
        needBindPhone: 0
      })
    }
    if (this.data.needBindPhone == 1 && this.data.oldAward != {}) {
      this.setData({
        isflg: true,
        isflgId: 2,
        popuptitle: '录入手机号',
        popupbtn: '绑定手机号码',
        isShowTitle: true, //显示弹窗标题
        awardDisplay: this.data.oldAward.awardDisplay, //账户内红包数目
      })
      this.pupop.showPupop() //打开弹窗
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获得弹框组件
    this.pupop = this.selectComponent("#pupop")
  },
  /* 显示弹框 */
  showPupop: function (e) {
    //判断显示弹窗内容
    if (e.currentTarget.dataset.activeId == '0') {
      this.setData({
        isflg: true,
        isflgId: 0,
        popuptitle: '活动说明',
        popupbtn: '我知道了',
        isActiveBtn: true, //当前点击活动说明
        isShowTitle: true, //显示弹窗标题
      })
      this.pupop.showPupop() // 开启弹窗
    } else if (e.currentTarget.dataset.activeId == '2') {
      //判断是否需要绑定手机号
      if (this.data.needBindPhone == 1) { //1 需要绑定手机号
        this.setData({
          isflg: true,
          isflgId: 2,
          popuptitle: '录入手机号',
          popupbtn: '绑定手机号码',
          isShowTitle: true, //显示弹窗标题
        })
        this.pupop.showPupop() //打开弹窗
      }
    }
  },
  // 从input中获取手机号
  userphone: function (e) {
    let phone = e.currentTarget.dataset.model
    let val = e.detail.value
    this.data[phone] = val
    this.setData({
      userphone: this.data[phone]
    })
  },
  // 从input中获取验证码
  textcode: function (e) {
    let password = e.currentTarget.dataset.model
    let val = e.detail.value
    this.data[password] = val
    this.setData({
      textcode: this.data[password]
    })
  },
  // 获取验证码
  getCode: function (e) {
    getSmsSend({
      userPhone: this.data.userphone,
      operateType: 1
    }).then(res => {
      if (this.data.userphone === '') {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      } else if (res.data.errCode === '10002') {
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
    })
  },
  /* 弹框确认按钮 */
  _btnok: function (e) {
    // 当前为活动说明按钮时直接关闭弹窗
    if (this.data.isActiveBtn == true) {
      this.pupop.hidePupop()
      this.setData({
        isActiveBtn: false
      })
      return
    }
    // 绑定手机号
    if (this.data.userphone === '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    } else if (this.data.textcode === '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    } else {
      setUserPhone({ //绑定手机号的调用函数
        userPhone: this.data.userphone,
        verifyCode: this.data.textcode
      }).then(res => {
        if (res.data.errCode === "10002") {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
        wx.setStorageSync('userphone', this.data.userphone) //更新缓存的手机号
        this.setData({
          needBindPhone: 0,
          getCodeDisabled: false, //开启按钮
          getBindTextCode: '获取验证码',
          setTextCode: '' //绑定成功后停止读秒
        })
        this.pupop.hidePupop()
      }).catch(err => {
        console.log(err)
      })
    }

  },
  /* 关闭弹窗按钮 */
  _error: function () {
    this.pupop.hidePupop()
    this.currinl() //将轮盘初始化
    this.setData({
      userphone: '',
      textcode: ''
    })
  },

  /* 点击抽奖 */
  doLuckDraw: function (e) {
    this.setData({
      isDisabled: true, //正在抽奖
    })
    // console.log(this.data.oldAward);
    // console.log(this.data.needBindPhone)
    if (this.data.needBindPhone == 1 && this.data.oldAward != {}) { //点击抽奖时的弹窗
      this.setData({
        isflg: true,
        isflgId: 2,
        popuptitle: '录入手机号',
        popupbtn: '绑定手机号码',
        awardDisplay: this.data.oldAward.awardDisplay, //账户内红包数目
        isShowTitle: true, //显示弹窗标题
        isDisabled: false, //打开按钮
      })
      this.pupop.showPupop() //打开弹窗
    } else {
      if (this.data.ticketNum < 1) {
        this.setData({
          isClick: true
        })
      } else {
        // 抽奖
        getLuckDraw({
          userId: this.data.lotteryInfoObj.userId,
          ticketNum: this.data.ticketNum,
          lotteryId: this.data.lotteryInfoObj.lotteryInfo.lotteryId,
          // inviterId: query.uid //邀请者ID
        }).then(res => {
          // console.log(res);
          if (res.data.errCode === "10001") {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            this.setData({
              isDisabled: false, //打开按钮
            })
            return
          }

          if (res.data.errCode === "10002") {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
            this.setData({
              isDisabled: false, //打开按钮
            })
            return
          }

          this.setData({
            luckDrawList: res.data,
            ticketNum: res.data.ticketNum,
            dayLimitNum: res.data.dayLimitNum,
            todayUsedNum: res.data.todayUsedNum,
            prizeImg: res.data.award.awardReminderPicUrl,
            oldAward: res.data.award,
            needBindPhone: res.data.needBindPhone
          })
          let angle = this.data.luckDrawList.angle //后台返回中奖角度
          this.start() //启动鱼的动画
          setTimeout(() => {
            this.turns(angle) //开启转盘
          }, 1500);

        }).catch(err => {
          // console.log(err)
          this.setData({
            isDisabled: false, //打开按钮
          })
        })

      }
    }
  },
  // 开启转盘动画
  turns: function (angle) {
    let random = 360 * 15
    // angle = 300
    this.aniLuckDraw = wx.createAnimation({
      duration: '3500',
      timingFunction: 'ease-in-out',
      delay: 0,
    })
    random -= angle
    this.aniLuckDraw.rotate(random).step()
    this.setData({
      animationData: this.aniLuckDraw.export()
    })
    //显示弹窗
    setTimeout(() => {
      //修改弹窗内容
      this.setData({
        isflg: false, //false 表示当前为两个按钮
        isflgId: 1, //通过id判断当前显示弹窗的内容
        isShowTitle: false, //不显示弹窗标题
        isDisabled: false //抽奖完毕
      })
      this.pupop.showPupop()
    }, 3800);
    this.dogetRotationList() //获奖信息列表(ps:刷新要要放在延时里面不然抽奖过程会刷新页面导致页面闪烁)
  },
  //轮盘初始化
  currinl: function () {
    if (this.aniLuckDraw != undefined) {
      this.aniLuckDraw.rotate(0).step({
        duration: 0,
        timingFunction: 'linear'
      })
      this.setData({
        animationData: this.aniLuckDraw.export()
      })
    }
  },
  //开启转盘
  /*   turns: function (angle) {
      let that = this //保存当前this指向
      let num = 0 //记录转动次数
      that.setData({
        random: angle,
        trasn: 0,
      })
      let a = setInterval(function () {
        that.setData({
          trasn: that.data.trasn + 5
        })
        if (360 <= that.data.trasn) {
          that.data.trasn = 0
          num = num + 1
        }
        if (num == 5) { //设置轮盘转动几圈
          clearInterval(a)
          that.currinl()
        }
      }, 5)
    }, */

  //中奖结果
  /*   currinl: function (e) {
      let awardName = this.data.luckDrawList.award.awardName //中奖内容
      let that = this
      let b = setInterval(function () {
        that.setData({
          trasn: 360 - that.data.random
        })
        if (that.data.random <= that.data.trasn) {
          //修改弹窗内容
          that.setData({
            isflg: false, //false 表示当前为两个按钮
            isflgId: 1, //通过id判断当前显示弹窗的内容
            awardName: awardName, //中奖内容
            isShowTitle: false, //不显示弹窗标题
            isDisabled: false //抽奖完毕
          })
          //显示弹窗
          setTimeout(() => {
            that.pupop.showPupop()
          }, 500);
          clearInterval(b) // 关闭定时器
        } else if (that.data.random >= that.data.trasn) {
          //修改弹窗内容
          that.setData({
            isflg: false, //false 表示当前为两个按钮
            isflgId: 1, //通过id判断当前显示弹窗的内容
            awardName: awardName, //中奖内容
            isShowTitle: false, //不显示弹窗标题
            isDisabled: false //抽奖完毕
          })
          //显示弹窗
          setTimeout(() => {
            that.pupop.showPupop()
          }, 500);
          clearInterval(b) // 关闭定时器
        }
      }, 10)

    }, */

  /* 系统用户登录  */
  dogetUserLogin: function () {
    const indexList = wx.getStorageSync('indexList')
    WxParse.wxParse('lotteryDescription', 'html', indexList.lotteryInfo.lotteryDescription, this, 5); //解析活动说明
    // console.log(indexList);

    if (indexList.errCode === "10002") {
      wx.showToast({
        title: indexList.msg,
        icon: 'none',
        duration: 10000
      })
    }

    if (indexList.ticketNum == 0) {
      setTimeout(() => {
        wx.showToast({
          title: '您的奖券已不足',
          icon: "none",
          duration: 2000
        })
      }, 500);
    }

    // console.log(indexList.oldAward);
    // console.log("message:" + indexList.message)

    this.setData({
      ticketNum: indexList.ticketNum, //奖券数
      lotteryInfoObj: indexList,
      needBindPhone: indexList.needBindPhone,
      roundPointer: indexList.lotteryInfo.lotteryPointerPicUrl, //转盘指针
      userId: indexList.userId, //用户id
      storeNo: indexList.lotteryInfo.storeNo, //店铺编号
      // lotteryDescription: indexList.lotteryInfo.lotteryDescription, //活动说明
      pageBg: indexList.lotteryInfo.lotteryBackgroundPicUrl,
      dayLimitNum: indexList.lotteryInfo.dayLimitNum,
      todayUsedNum: indexList.todayUsedNum,
      rouletteBgImg: indexList.lotteryInfo.lotteryTurntablePicUrl, //转盘图片
      oldAward: indexList.oldAward,
      anifishList: indexList.ticketNum, // 绘制鱼的数量

    })
    // console.log('index:' + indexList.oldAward);
    wx.setNavigationBarTitle({ //修改标题
      title: indexList.lotteryInfo.lotteryName,
    })
    wx.setStorageSync('userphone', indexList.phone)
    this.dogetRotationList() //获奖信息轮播列表
    this.dogetTiketNum() //获取最新奖券
    wx.hideLoading()
    //隐藏导航条加载动画
    // wx.hideNavigationBarLoading();
    //停止下拉刷新
    // wx.stopPullDownRefresh();

    if (indexList.needBindPhone == 1 && indexList.oldAward != {}) { //首次弹窗
      this.setData({
        isflg: true,
        isflgId: 2,
        popuptitle: '录入手机号',
        popupbtn: '绑定手机号码',
        awardDisplay: indexList.oldAward.awardDisplay, //账户内红包数目
        isShowTitle: true, //显示弹窗标题
      })
      this.pupop.showPupop() //打开弹窗
    }

    if (indexList.message) { //你不是平台信息新用户
      console.log('index.js:' + indexList.message);
      wx.showToast({
        title: indexList.message,
        icon: 'none',
        duration: 3000
      })
    }
  },

  /* 获取红包列表 */
  getUserRedpackets: function () {
    getUserRedpacket({ //获取红包列表
      pageSize: 1,
      pageNum: 1
    }).then(res => {
      if (res.data.appUserAwardList) {
        if (res.data.appUserAwardList.length >= 0) {
          this.setData({
            getUserRedpacketLen: res.data.appUserAwardList.length
          })
        }
      }
    })
  },

  /* 获奖信息轮播列表 */
  dogetRotationList: function () {
    let lotteryNo = this.data.lotteryInfoObj.lotteryInfo.lotteryNo
    getRotationList({
      lotteryNo: lotteryNo
    }).then(res => {
      // console.log(res);
      this.setData({
        wininfoArray: res.data.rotationList
      })
    })
  },

  /* 获取最新奖券数 */
  /*   getTicketNum: function () {
      let ticketNum = this.data.lotteryInfoObj.ticketNum //初始票数
      let newNum = this.data.luckDrawList.ticketNum //用户还剩票数
      if (newNum != undefined) {
        return newNum
      } else {
        return ticketNum
      }
    }, */

  /*  保存图片 */
  doDownloadImage: function (e) {
    this.currinl() //将轮盘初始化
    var url = this.data.prizeImg;
    wx.downloadFile({
      url: url,
      success: function (res) {
        var benUrl = res.tempFilePath;
        //图片保存到本地相册
        wx.saveImageToPhotosAlbum({
          filePath: benUrl,
          //授权成功，保存图片
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          //授权失败
          fail: function (err) {
            if (err.errMsg) { //重新授权弹框确认
              wx.showModal({
                title: '提示',
                content: '您好,请先授权，再保存此图片。',
                showCancel: false,
                success(res) {
                  if (res.confirm) { //重新授权弹框用户点击了确定
                    wx.openSetting({ //进入小程序授权设置页面
                      success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) { //用户打开了保存图片授权开关
                          wx.saveImageToPhotosAlbum({
                            filePath: benUrl,
                            success: function (data) {
                              wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                              })
                            },
                          })
                        } else { //用户未打开保存图片到相册的授权开关
                          wx.showModal({
                            title: '温馨提示',
                            content: '授权失败，请稍后重新获取',
                            showCancel: false,
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  /* 分享给朋友 */
  onShareAppMessage: function (e) {
    //this.pupop.hidePupop() //先关闭上一个弹窗
    this.currinl() //将轮盘初始化
    let sno = this.data.storeNo
    let uid = this.data.userId
    return {
      title: '分享',
      path: '/pages/index/index?uid=' + uid + '&sno=' + sno,
      success: (res) => {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        // 分享失败
      },
    }
  },

  /* 倒计时 */
  doConutDown: function () {
    this.setData({
      setTextCode: 60
    })
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

  /* 自定--刷新 */
  // onRefresh: function () {
  // console.log('onRefresh');
  //在当前页面显示导航条加载动画
  // wx.showNavigationBarLoading();
  //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
  // this.dogetUserLogin()
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  // wx.showLoading({
  //   title: '请稍等...',
  // })
  //调用刷新时将执行的方法
  // this.onRefresh();
  // this.dogetTiketNum()// 获取最新奖券
  // },

  /* 获取最新奖券 */
  dogetTiketNum: function () {
    setTimeout(() => {
      // 获取分享进来后每次的奖券数目
      // && this.data.storeNo != null
      if (this.data.userId != null) {
        setInterval(() => {
          getTicket({
            userId: this.data.userId,
            // storeNo: this.data.storeNo
          }).then(res => {
            // console.log(res);
            console.log(res.data.ticketNum);
            if (res.data.addTicketNum != 0) {
              this.setData({
                ticketNum: res.data.ticketNum,
                anifishList: res.data.ticketNum
              })
            }
            if (res.data.message) {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
          })
        }, 2000)

      }
    }, 1000)
  },

  /* 猫吃鱼的动画 */
  start: function () {
    if (this.data.anifishList >= 8) {
      var animation = wx.createAnimation({
        duration: 1200, //动画持续时间
        timingFunction: 'ease', //先慢后快
        delay: 0 //延迟时间
      });
      animation.opacity(0).translateY(-30).opacity(1).step()
      animation.translateX(-290).opacity(0.8).step()
      this.setData({
        ani: animation.export()
      })

      setTimeout(() => {
        this.setData({
          anifishList: this.data.ticketNum //重新给鱼赋值
        })
      }, 1400)

      setTimeout(() => { //将鱼进行复位
        animation.opacity(0).translateY(0).translateX(0).step({
          duration: 0,
          timingFunction: 'linear'
        })
        this.setData({
          ani: animation.export(),
        })
      }, 3000)

    } else {
      var animation = wx.createAnimation({
        duration: 2000, //动画持续时间
        timingFunction: 'ease', //先慢后快
        delay: 0 //延迟时间
      });
      animation.rotate(45, 45).scale(15, 15).opacity(0.8).opacity(0.6).opacity(0.4).opacity(0.2).opacity(0).step()
      this.setData({
        anis: animation.export()
      })
      setTimeout(() => {
        animation.opacity(1).scale(1, 1).rotate(0, 0).step({
          duration: 0,
          timingFunction: 'linear'
        })
        this.setData({
          anis: animation.export(),
          anifishList: this.data.ticketNum //重新给鱼赋值
        })
      }, 3000)
    }
  },








})