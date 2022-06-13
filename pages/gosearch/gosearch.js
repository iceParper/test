Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: '',  //搜索历史
    history_delect: '',  //删除历史
    history_list: [],  //历史记录列表
    historydelect: true,
    shoppingtext: '',  //清除搜索框的值
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoppingarray: [ //商品
      {
        coupon: '满100减50',
        name: '东北烧烤',
        url: '../../image/2.png'
      },
      {
        coupon: '85折优惠劵',
        name: '老王大饭店',
        url: '../../image/3.png'
      },
      {
        coupon: '新客送免费招牌炸鸡',
        name: '韩式明洞炸鸡店',
        url: '../../image/4.png'
      },
      {
        coupon: '充值100减60',
        name: '一剪没理发店',
        url: '../../image/5.png'
      },
      {
        coupon: '送东北大米饭快来',
        name: '张师傅家常菜，很多新口味.',
        url: '../../image/6.png'
      },
    ],
    // 输入框内容
    inputValue:null,

  },
   // 获取输入框内的值
   handleInput(e){
    // var keyword = 'queryInfo.keyWord'
    // this.setData({
    //   [keyword]:e.detail.value
    // })
    console.log(e.detail.value);
  },
  // 清空输入框
  handleClear(e){
    this.setData({
      inputValue:""
    })
  },
    //搜索
    search: function(e) {
      var searchtext = this.data.shoppingtext; //搜索框的值
      var sss = true;
      if (searchtext != "") {
        //将搜索框的值赋给历史数组
        this.data.historyArray.push(searchtext);
        //模糊查询 循环查询数组中的title字段
        for (var index in this.data.shoppingarray) {
          var num = this.data.shoppingarray[index].title.indexOf(searchtext);
          let temp = 'shoppingarray[' + index + '].status';
          if (num != -1) { //不匹配的不显示
            this.setData({
              [temp]: 1,
            })
            sss = false //隐藏未找到提示
          }
        }
        this.setData({
          history: false, //隐藏历史记录
          noneview: sss, //隐藏未找到提示
          shoppinglist: true, //显示商品列表
          newArray: this.data.historyArray //给新历史记录数组赋值
        })
      } else {
        this.setData({
          noneview: true, //显示未找到提示
          shoppinglist: false, //隐藏商品列表
          history: false, //隐藏历史记录
        })
      }
    },
    //搜索框的值
    shoppinginput: function(e) {
      //当删除input的值为空时
      if (e.detail.value == "") {
        this.setData({
          history: true, //显示历史记录
          shoppinglist: false //隐藏商品列表
        });
        //所有商品列表的状态改为0
        for (var index in this.data.shoppingarray) {
          let temp = 'shoppingarray[' + index + '].status';
          this.setData({
            [temp]: 0,
          })
        }
      }
      this.setData({
        shoppingtext: e.detail.value
      })
    },
    //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      shoppingtext: e.target.dataset.text
    })
  },
  history_delect: function(e){
    //弹窗方法1：
    wx.showModal({
      content: '确认'+'删除'+'全部历史记录吗？',
      confirmColor: '#576B95',
      confirmText: '是',
      cancelColor: '#353535',
      cancelText: '否'
    }), 
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoppingtext: "" //清空搜索框
    })
    //弹窗方法2：

  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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