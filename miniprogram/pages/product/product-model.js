import {Base} from '../../utils/base.js';

class Product extends Base{
  constructor(){
    super();
  }
  getDetailInfo(id,callBack) {
      var params = {
        url: 'wxld9',
        sCallBack: function (res) {
          callBack && callBack(res);
        }
      }
      this.request(params);
    } 
};

export {Product};