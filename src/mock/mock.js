import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
const mock = require('mockjs');
const Random = mock.Random;
// const Random = MockAdapter.Random;
let _Users = Users;


export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);
    let dicData = [];
    for (let i = 0; i < 10; i++) {
      let data1 = {
        createBy: Random.cname(),
        updateBy: Random.cname(),
        createTime: Random.date(),
        updateTime: Random.date(),
        describe: Random.cword(2, 5),
        type: Random.natural(1,100),
        version: Random.float(1, 100, 2, 3)
      }
      dicData.push(data1)
    }
    mock.onGet('/dictionData').reply(200, {
      dicData: dicData
    });
    let data= [];
    let data2 = [];
    let data3 = [];
    for(let i =0;i<10;i++) {
      let a = {
        oederid:Random.id(), //订单号
        couriershop:Random.csentence(5, 10),//物流公司
        ordertime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        orderuserweixin: Random.natural(),//微信
        orderusertel: Random.natural(),//手机
        orderstatus:Random.guid(),//订单状态
        orderprice:Random.natural(60, 100),//订单总价
        couriernumber:Random.natural(10000),//快递号
        orderendtime:Random.date() + ' ' + Random.time(),
        version:Random.increment(100)//版本号
      }
      data.push(a)
    }
    // Mock.mock('/one','get',data)
      // 图片上传接口
      for(let i =0;i<10;i++) {
          let a = {
              filename:Random.id(), //文件名称
              showstarttime:Random.date() + ' ' + Random.time(),//物流公司
              showendtime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
              url: Random.natural(),//微信
          }
          data2.push(a)
      }

      // 图片上传接口
      for(let i =0;i<10;i++) {
          let a = {
              id:Random.id(), //文件名称
              filetype: Random.csentence(5,8),//微信
          }
          let b = {
              id:Random.id(), //文件名称
              goodsname: Random.csentence(5,8),//微信
              // originalprice: Random.
          }
          data3.push(a)
      }

      // 图片上传类型
      mock.onGet('/three').reply(200,{
          data: data3,
      })

      // 图片上传接口
      mock.onGet('/two').reply(200,{
          data: data2,
      })

    mock.onPost('/one').reply(200,{
      data: data,
    })

    // mock success request
    mock.onGet('/success').reply(200, {
        // msg: a,
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });
    

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};