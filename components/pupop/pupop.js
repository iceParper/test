// components/pupop.js
Component({
  options: {
    multipleSlots: true //启用solt  
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: { //属性名
      type: String, //类型
      value: '标题' //属性初始值
    },
    btn_ok: {
      type: String,
      value: '按钮'
    },
    isflg: {
      type: Boolean,
      value: true
    },
    isShowTitle: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏弹框
    hidePupop: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    // 显示弹框
    showPupop: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    /* 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    // 触发按钮的回调事件
    // 确认
    _btnOk: function () {
      this.triggerEvent('success')
    },
    // 关闭
    _error: function () {
      this.triggerEvent('error')
    },



  }
})