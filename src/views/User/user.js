import axios from '../../api/axios'

const requests = {
  getUserInfo(data) {
    return axios('/user/query-user', {
      method: 'post',
      data: data
    })
  }
}
export default requests
