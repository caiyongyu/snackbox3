// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     heidaboxMessage:[]//云函数的数据
  },
  gotoBedroomBuy: function () {
    wx.navigateTo({
      url: '../bedroomBuy/bedroomBuy',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过云函数请求数据
     wx.cloud.callFunction({
       name:"heidaboxMessage",
       data:{
         start:this.data.heidaboxMessage.length,
         count:5
       }
     }).then(res=>{
       console.log(res);
       this.setData({
         heidaboxMessage:this.data.heidaboxMessage.concat(res.result.event)

       })
     }).catch(err=>{
      console.error(err);
     });

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