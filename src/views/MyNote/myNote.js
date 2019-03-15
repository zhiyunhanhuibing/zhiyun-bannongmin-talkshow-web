import axios from '../../api/axios';
const require = {
    systemAdd(data){
        return axios('/system-user/add',{
            method:'post',
            data:data,
        })
    },
    systemDel(data) {
        return axios('/system-user/del',{
            method : 'post',
            data: data,
        })
    },
    systemModify(data) {
        return axios('/system-user/modify',{
            method: 'post',
            data : data,
        })
    },
    systemQuery(data) {
        return axios('/article/query',{
            method : 'post',
            data : data,
        })
    }
}
export default require;