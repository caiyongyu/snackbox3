// pages/product/product.js
import {Product} from 'product-model.js';
import {Cart} from '../cart/cart-model.js';
var product=new Product();
var cart=new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    countsArray:[1,2,3,4,5,6,7,8,9,10],
    productCount:1,
    currentTabsIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    this.data.id=id;
    // console.log(id);
    this._loadData();
  },

  _loadData:function(callback){
    // var that = this;
    product.getDetailInfo(this.data.id, (data) => {
      this.setData({
        cartTotalCounts: cart.getCartTotalCounts(),
        product: data,
        // loadingHidden: true
      });
      // callback && callback();
    });

  },

  bindPickerChange:function(event){
    var index=event.detail.value;
    var selectedCount=this.data.countsArray[index];
    this.setData({
      productCount:selectedCount
    })
  },

  onTabsItemTap:function(event) {
    var index=product.getDataSet(event,'index');
    this.setData({
      currentTabsIndex:index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //添加到购物车
  onAddingToCartTap:function(events){
    //防止快速点击
    if(this.data.isFly){
      return;
    }
    this._flyToCartEffect(events);
    this.addToCart();
  },

  addToCart:function(){
    var tempObj={};
    var keys=['id','name','main_img_url','price'];

    for(var key in this.data.product){
      if(keys.indexOf(key)>=0){
        tempObj[key]=this.data.product[key];
      }
    }
    cart.add(tempObj,this.data.productCount);
  },

// 添加到购物车动效
  _flyToCartEffect: function (events) {
    //获得当前点击的位置，距离可视区域左上角
    var touches = events.touches[0];
    var diff = {
      x: '25px',
      y: 25 - touches.clientY + 'px'
    },
      style = 'display: block;-webkit-transform:translate(' + diff.x + ',' + diff.y + ') rotate(350deg) scale(0)';  //移动距离
    this.setData({
      isFly: true,
      translateStyle: style
    });
    var that = this;
    setTimeout(() => {
      that.setData({
        isFly: false,
        translateStyle: '-webkit-transform: none;',  //恢复到最初状态
        isShake: true,
      });
      setTimeout(() => {
        var counts = that.data.cartTotalCounts + that.data.productCount;
        that.setData({
          isShake: false,
          cartTotalCounts: counts
        });
      }, 200);
    }, 1000);
  },

  onCartTap:function(event){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
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