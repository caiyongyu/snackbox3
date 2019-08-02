// 云函数入口文件
const cloud = require('wx-server-sdk')

var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return rp(`https://ip:port/home/getSnackBoxInfo?start=${event.start}$count=${event.count}`)
    .then(function (res) {
      console.log(res);
      return res
    })
    .catch(function (err) {
      console.err(err);
    });
}