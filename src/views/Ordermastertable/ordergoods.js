import axios from '../../api/axios'

const requrest = {
  getTable(data = {}) {
    return axios('/order/query-goods', {
      method: 'post',
      data: data
    })
  }
}
export default requrest
