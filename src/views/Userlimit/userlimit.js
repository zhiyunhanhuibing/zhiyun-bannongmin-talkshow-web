import axios from '../../api/axios'

const requests = {
    // 活动信息列表查询接口
    Getuserlimittype (type) {
        return axios('/dict/get-data/'+type, {
            method: 'get'
        })
    },
    // 活动信息添加接口
    Addactivityinformation (data) {
        return axios('/activity/add', {
            method: 'post',
            data: data
        })
    },
    // 活动信息修改接口
    Modifyactivityinformation (data) {
        return axios('/activity/modify', {
            method: 'post',
            data: data
        })
    },
    // 活动信息查询接口
    Queryactivityinformation (data) {
        return axios('/activity/query', {
            method: 'post',
            data: data
        })
    }
}

export default requests
