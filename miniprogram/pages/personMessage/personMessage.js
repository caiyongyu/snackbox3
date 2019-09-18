// pages/personMessage/personMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone:'',//获取到的电话号码
    verify:"",//获取的验证码
      array: ['黑龙江大学', '理工大学', '哈工程', '哈学校'],//学校
      objectArray: [
        {
          id: 0,
          name: '黑龙江大学'
        },
        {
          id: 1,
          name: '理工大学'
        },
        {
          id: 2,
          name: '哈工程'
        },
        {
          id: 3,
          name: '哈学校'
        }
      ],
      index: 0,
  },
  bindPickerChange: function (e) {//选择学校
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onTelephoneChange:function(){
    //电话输入框绑定的函数
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