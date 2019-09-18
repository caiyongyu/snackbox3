import {Base} from '../../utils/base.js';
class Home extends Base{
  //构造函数
  constructor(){
    super();
  }
  getBannerData(id,callBack){
    var params={
      url: 'p27z9',
      sCallBack:function(res){
        callBack&&callBack(res);
      }
    }
    this.request(params);
    // wx.request({
    //   url: 'https://api.myjson.com/bins/v4lrz',
    //   method:"GET",
    //   success:function(res){
    //     //  console.log(res);
    //     callBack(res);
    //   }
    // })
  }

  // 首页主题
  getThemeData(callBack) {
    var params = {
      url: 'dv9t1',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getProductData(callBack) {
    var params = {
      url: '7hxmt',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}
export {Home};