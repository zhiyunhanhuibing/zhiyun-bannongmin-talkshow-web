import axios from '../../api/axios'

const requests = {
    // 收获地址管理查询接口
    PostHarvestaddress ( data = {} ) {
        return axios('/address/query', {
            method: 'post',
            data: data
        })
    },
}

export default requests
