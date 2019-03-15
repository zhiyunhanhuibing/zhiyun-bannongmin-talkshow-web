import axios from '../../api'
const require ={
    roleAdd(data){
        return axios('/post-role/add',{
            method: post,
            data : data,
        })
    },
    roleDel(data){
        return axios('/post-role/del',{
            method : post,
            data :data,
        })
    },
    roleModify(data){
        return axios('/post-role/modify',{
            method:post,
            data:data,
        })
    },
    roleQuery(data) {
        return axios('/post-role/query',{
            method:post,
            data:data,
        })
    }
}