// pages/category/category.js
import { Category } from 'category-model.js';
var category = new Category();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5'],
    currentMenuIndex: 0,
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function (callback) {
    var that = this;
    category.getCategoryType((categoryData) => {
      that.setData({
        loadingHidden: true,
        categoryTypeArr: categoryData
      })

      that.getProductsByCategory(categoryData[0].id, (data) => {

        var dataObj = {
          procucts: data,
          topImgUrl: categoryData[0].img_url,
          title: categoryData[0].name
        }

        that.setData({
          loadingHidden: true,
          categoryInfo0: dataObj
        });
        callback && callback();
      })
    })

  },

  changeCategory: function (event) {
    var index = category.getDataSet(event, 'index'),
      id = category.getDataSet(event, 'id')
    this.setData({
      currentMenuIndex: index
    })

    if (!this.isLoadedData(index)) {
      var that = this;
      this.getProductsByCategory(id, (data) => {
        that.setData(that.getDataObjForBind(index, data))
      })
    }
  },

  isLoadedData: function (index) {
    if (this.data['categoryInfo' + index]) {
      return true;
    }
    return false;
  },


  getDataObjForBind: function (index, data) {
    var obj = {},
      arr = [0, 1, 2, 3, 4, 5],
      baseData = this.data.categoryTypeArr[index];
    for (var item in arr) {
      if (item == arr[index]) {
        obj['categoryInfo' + item] = {
          procucts: data,
          topImgUrl: baseData.img_url,
          title: baseData.name
        }
        return obj;
      }
    }
  },

  getProductsByCategory: function (id, callback) {
    category.getProductsByCategory(id, (data) => {
      callback && callback(data);
    });
  },

  onboxProductsItemTap: function (event) {
    var id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product',
    })
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
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });

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
    return {
      title: '零食商贩 pretty Vendor',
      path: 'pages/category/category'
    }
  }
})