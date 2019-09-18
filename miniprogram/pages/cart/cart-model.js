import { Base } from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super();
    this._storageKeyName='cart';
  };

  //加入购物车
  add(item,counts) {
    var cartData=this.getCartDataFromLocal();

    var isHasInfo=this._isHasThatOne(item.id,cartData);
    if(isHasInfo.index==-1){
      item.counts=counts;
      item.selectStatus=true;//添加进来，设置选中状态
      cartData.push(item);
    }
    else{
      cartData[isHasInfo.index].counts+=counts;
    }
    wx.setStorageSync(this._storageKeyName,cartData);
    // return cartData;
  };

  //计算购物车商品总数
  //flag true 考虑商品选择状态
  getCartTotalCounts(flag){
    var data=this.getCartDataFromLocal();
    var counts=0;

    for(let i=0;i<data.length;i++){
      if(flag){
        if(data[i].selectStatus){
          counts += data[i].counts;
        }
      }
      else{
        counts += data[i].counts;
      }
    }
    return counts;
  }

  //从缓存中读取数据
  getCartDataFromLocal(flag){
    var res=wx.getStorageSync(this._storageKeyName);
    if(!res){
      res=[];
    }

    if(flag){
      var newRes=[];
      for(let i=0;i<res.length;i++){
        if(res[i].selectStatus){
          newRes.push(res[i]);
        }
      }
      res=newRes;
    }
    return res;
  };

  // 判断某个商品是否已经被添加到购物车中，已存在则返回这个商品的数据和在数组中的序号
  _isHasThatOne(id,arr){
    var item,result={index:-1};
    for(let i=0;i<arr.length;i++){
      item=arr[i];
      if(item.id==id){
        result={
          index:i,
          data:item
        };
        break;
      }
    }
    return result;
  };

//私有方法，修改商品数量
//定义为私有方法，只允许内部开发者调用，防止出现用户传入counts=-3，原有商品数量2，结果为-1这种不符合逻辑的结果
  _changeCounts(id,counts){
    var cartData=this.getCartDataFromLocal(),
    hasInfo=this._isHasThatOne(id,cartData);
    if(hasInfo.index!=-1){
      if(hasInfo.data.counts>1){
        cartData[hasInfo.index].counts+=counts;
      }
    }
    wx.setStorageSync(this._storageKeyName,cartData);
  };

  addCounts(id){
    this._changeCounts(id,1);
  }

  cutCounts(id){
    this._changeCounts(id,-1);
  }

  delete(ids){
    if(!(ids instanceof Array)){
      ids=[ids];
    }
    var cartData=this.getCartDataFromLocal();
    for(let i=0;i<ids.length;i++){
      var hasInfo=this._isHasThatOne(ids[i],cartData);
      if(hasInfo.index!=-1){
        cartData.splice(hasInfo.index,1);
      }
    }
    wx.setStorageSync(this._storageKeyName,cartData);
  }
//更新缓存
  execSetStorageSync(data){
    wx.setStorageSync(this._storageKeyName,data)
  }
};

export { Cart };