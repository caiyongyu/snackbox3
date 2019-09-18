// pages/cart/cart.js
import { Cart } from 'cart-model.js';
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {

  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartData = cart.getCartDataFromLocal();
    // var countsInfo = cart.getCartTotalCounts(true);
    var cal=this._calcTotalAccountAndCounts(cartData);
    this.setData({
      selectedCounts:cal.selectedCounts,
      selectedTypeCounts:cal.selectedTypeCounts,
      account:cal.account,
      cartData:cartData
    })
  },

  _calcTotalAccountAndCounts:function(data){
    var len=data.length,
    //选中商品的总价格
    account=0,
    //选中商品的总个数
    selectedCounts=0,
    //选中商品种类的总数
    selectedTypeCounts=0;

    let multiple=100;

    for(let i=0;i<len;i++){
      if(data[i].selectStatus){
        account+=data[i].counts*multiple*Number(data[i].price)*multiple;
        selectedCounts+=data[i].counts;
        selectedTypeCounts++;
      }
    }

  return{
    selectedCounts: selectedCounts,
    selectedTypeCounts: selectedTypeCounts,
    account:account/(multiple*multiple)
  }
  },

  toggleSelect:function(event){
    var id=cart.getDataSet(event,'id'),
    status=cart.getDataSet(event,'status'),
    index=this._getProductIndexById(id);

    this.data.cartData[index].selectStatus=!status;
    this._resetCartData();
  },

  toggleSelectAll:function(event){
    var status=cart.getDataSet(event,'status')=='true';

    //选中到未选中
    var data=this.data.cartData,
    len=data.length;
    for(let i=0;i<len;i++){
      data[i].selectStatus=!status;
    }
    this._resetCartData();
  },

//重新计算商品数量与价格数据
  _resetCartData:function(){
    var newData=this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      account: newData.account,
      cartData:this.data.cartData 
    })
  },

//根据商品id得到 商品所在下标
  _getProductIndexById:function(id){
    var data=this.data.cartData,
    len=data.length;
    for(let i=0;i<len;i++){
      if(data[i].id==id){
        return i;
      }
    }
  },

  changeCounts:function(event){
    var id=cart.getDataSet(event,'id'),
    type=cart.getDataSet(event,'type'),
    index=this._getProductIndexById(id),
    counts=1;

    if(type=='add'){
      cart.addCounts(id);
    }else{
      counts=-1;
      cart.cutCounts(id);
    }
    this.data.cartData[index].counts+=counts;
    this._resetCartData();
  },

  delete:function(event){
    var id=cart.getDataSet(event,'id'),
    index=this._getProductIndexById(id);

    this.data.cartData.splice(index,1);
    this._resetCartData();
    cart.delete(id);
  },

  submitOrder:function(event){
    wx.navigateTo({
      url: '../order/order?account='+this.data.account+'&from=cart',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    cart.execSetStorageSync(this.data.cartData);
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