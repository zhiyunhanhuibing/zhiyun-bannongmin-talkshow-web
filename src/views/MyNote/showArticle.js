import axios from '../../api/axios';
const require = {
    systemQuery(data) {
        return axios('/article/getArticleByUuid',{
            method : 'post',
            data : data,
        })
    }
}
export default require;