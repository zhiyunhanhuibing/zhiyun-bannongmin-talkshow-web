import axios from '../../api/axios';
const require = {
    systemAdd(data){
        return axios('/article/add',{
            method:'post',
            data:data,
        })
    }
}
export default require;