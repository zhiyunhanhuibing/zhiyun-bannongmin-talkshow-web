
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
var data1 = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});
// const data = function() {
//     let data=[];
//     for(let i =0;i<4;i++) {
//       let a = {
//         oederid:Random.id(), //订单号
//         couriershop:Random.csentence(5, 10),//物流公司
//         ordertime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
//         orderuserweixin: Random.natural(),//微信
//         orderusertel: Random.natural(),//手机
//         orderstatus:Random.area(),//订单状态
//         orderprice:Random.natural(60, 100),//订单总价
//         couriernumber:Random.natural(10000),//快递号
//         orderendtime:Random.date() + ' ' + Random.time(),
//         version:Random.increment(100)//版本号
//       }
//       data.push(a)
//     }
//     return {
//       data:data
//     }
//   };
  Mock.mock('/one','get',data1)