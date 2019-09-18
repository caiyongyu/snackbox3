// pages/home/home.js
import {Home} from './home-module.js';
var home=new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData:function(){
    var id=1;
    home.getBannerData(id,(res)=>{
      console.log(res);
      this.setData({
        dataArr:res
      })
    });
    home.getThemeData((res)=>{
      console.log(res);
      this.setData({
        'themeArr':res
      })
    });
    home.getProductData((res) => {
      console.log(res);
      this.setData({
        productsArr: res
      })
    })
  },

  onProductsItemTap:function(event){
    console.log(event);
    var id=home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id,
    })
  },

  onThemesItemTap: function (event) {
    console.log(event);
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../category/category?id=' + id+'&name='+name,
    })
  },

  onboxProductsItemTap: function (event) {
    console.log(event);
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../category/category?id=' + id + '&name=' + name,
    })
  },

  // callBack:function(res){
  //   console.log(res);
  // },

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