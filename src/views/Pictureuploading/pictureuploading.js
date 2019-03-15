import axios from '../../api/axios'

const requests = {
    // 查询文件类型
    FileType (type) {
        return axios('/dict/get-data/'+type, {
            method: 'get'
        })
    },
    // 查询文件
    QueryFile (data) {
        return axios('/upload-files-message/query',{
            method: 'post',
            data:data
        })

    },
    // 添加文件
    AddFile (data) {
        return axios('/upload-files-message/add',{
            method: 'post',
            data:data
        })
    },

    // 修改文件
    ModifyFile (data) {
        return axios('/upload-files-message/modify',{
            method: 'post',
            data:data
        })
    },

    // 删除文件
    DeleteFile (data) {
        return axios('/upload-files-message/del',{
            method: 'post',
            data:data
        })
    }
}

export default requests