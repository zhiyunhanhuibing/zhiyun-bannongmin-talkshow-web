import axios from '../../api/axios'

const requests = {
    // 商品类型查询接口
    PostCommoditytype () {
        return axios('/goods-type/query', {
            method: 'post'
        })
    },

    // 商品类型下面的商品查询
    QuerySingledata (data) {
        return axios('/goods/select-type', {
            method: 'post',
            data: data
        })
    },

    // 添加商品
    AddMerchandise (data) {
        return axios('/goods/add', {
            method: 'post',
            data: data
        })
    },
    //删除商品
    DeleteMerchandise (data) {
        return axios('/goods/delete', {
            method: 'post',
            data: data
        })
    },
    // 修改商品
    ModifyMerchandise (data) {
        return axios('/goods/modify', {
            method: 'post',
            data: data
        })
    }

}

export default requests