import axios from 'axios'
// @ == src
import baseUrl from './config'
import  { Message } from 'element-ui'

/*
* 增加请求拦截器
*/
axios.interceptors.request.use((config) => {
  // 预处理请求的信息
  return config
}, (error) => {
  // 预处理请求有异常error时抛出错误
  return Promise.reject(error)
})

/*
* 增加相应拦截器
*/
axios.interceptors.response.use((response) => {
  // 预处理相应的数据
  return response
}, (error) => {
  // 错误返回 状态码验证
  return Promise.reject(checkStatus(error))
})

/**
 * 状态码校验
 * @param response
 * @return {*}
 */
function checkStatus (response) {
// 有响应时校验状态
  if (response) {
    // -10 自己定义，连接错误的status
    const status = response.status || -10
    if (status === 200 || status === 304 || status === 400) {
      return response.data
    } else {
      let errorInfo = ''
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试'
          break
        case 400:
          errorInfo = '400: 错误请求'
          break
        case 401:
          errorInfo = '401: 访问令牌无效或已过期'
          break
        case 403:
          errorInfo = '403: 拒绝访问'
          break
        case 404:
          errorInfo = '404：资源不存在'
          break
        case 405:
          errorInfo = '405: 请求方法未允许'
          break
        case 408:
          errorInfo = '408: 请求超时'
          break
        case 500:
            Message({
                showClose: true,
                message: `500：访问服务失败`,
                type: 'error',
                duration: 5*1000
            })
          // errorInfo = '访问服务失败'
          break
        case 501:
          errorInfo = '501：未实现'
          break
        case 502:
          errorInfo = '502：无效网关'
          break
        case 503:
          errorInfo = '503: 服务不可用'
          break
        // 其他错误
        default:
          // errorInfo = `连接错误${status}`
          Message({
              showClose: true,
              message: `连接错误${status}`,
              type: 'error',
              duration: 5*1000
          })
      }
      return {status, msg: errorInfo}
    }
  }
  // 异常状态下，返回错误信息
  return {status: -404, msg: '网络异常'}
}
/**
 * 返回axios方法
 * @param url（如果传绝对地址则baseURL不会追加到url之前）
 * @param method
 * @param timeout
 * @param data
 * @param headers
 * @param dataType
 * @returns {AxiosPromise}
 */
export default function (url, {
  // 默认请求方式post
  method = 'post',
  // 超时
  timeout = 10000,
  // 请求主题
  data = {},
  // 请求头
  headers = {'Content-Type': 'application/json; charset=utf-8;'},
  // 文件类型
  dataType = 'json'
}) {
  // 可根据不同method动态配置headers
  if (method === 'get') {
    headers = Object.assign({}, headers)
  } else {
    headers = Object.assign({}, headers)
  }
  const config = {
    method: method,
    timeout: timeout,
    url: url,
    // 在外部文件配置axios的基础路径 ip地址
    baseURL: baseUrl.URL_EASYMOCK,
    data: data,
    headers: headers,
    dataType: dataType
  }
  return axios(config)
}
