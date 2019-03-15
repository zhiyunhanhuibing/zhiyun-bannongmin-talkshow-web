import axios from './axios'
const requests = {
  UserLogin (data) {
    // user 请求接口
    return axios('/system-user-login/sign-in', {
      // 请求方法
      method: 'post',
      // 请求体
      data: data
    })
  },
}
// 导出对象，然后在全局注册或在单个vue文件下调用
export default requests
