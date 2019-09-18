import { Base } from '../../utils/base.js';

class Category extends Base {
  constructor() {
    super();
  }
  getCategoryType(callBack) {
    var params = {
      url: '13cuzh',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  // 获得某种分类的商品
  getProductsByCategory(id, callBack) {
    var params = {
      url: 'd1i1p',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
};

export { Category };