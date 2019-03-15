import axios from '../../api/axios'

const requests = {
  getGood(data = {}) {
    return axios('/order/query', {
      method: 'post',
      data: data
    })
  }
}
export default requests
