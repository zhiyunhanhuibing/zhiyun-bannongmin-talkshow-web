import axios from '../../api/axios'

const requests = {
    //添加类型
    PostTypeAdd (data) {
        return axios('/dict-type/add',{
            method: 'post',
            data: data
        })
    },
    //删除类型
    PostTypeDel (data) {
        return axios('/dict-type/del',{
            method: 'post',
            data: data
        })
    },//修改类型
    PostTypeModify (data) {
        return axios('/dict-type/modify',{
            method: 'post',
            data: data
        })
    },//查询类型
    PostTypeQuery () {
        return axios('/dict-type/query',{
            method: 'post'
        })
    },
    // 添加字典
    PostAddDict (data) {
        return axios('/dict/add', {
            method: 'post',
            data: data
        })
    },
    // 删除字典
    PostDelDict (data) {
        return axios('/dict/del', {
            method: 'post',
            data: data
        })
    },
    // 修改字典
    PostModifyDict (data) {
        return axios('/dict/modify', {
            method: 'post',
            data: data
        })
    },
    // 查询字典
    PostQueryDict (data) {
        return axios('/dict/query', {
            method: 'post',
            data: data
        })
    }
}

export default requests
