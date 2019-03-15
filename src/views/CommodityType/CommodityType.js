import axios from '../../api/axios'

const requests = {
    // 商品类型查询接口
    PostCommoditytype () {
        return axios('/goods-type/query', {
            method: 'post'
        })
    },
    // 商品类型添加接口
    PostappendCommoditytype (data) {
        return axios('/goods-type/add', {
            method: 'post',
            data: data
        })
    },
    // 商品类型删除接口
    PostdelCommoditytype (data) {
        return axios('/goods-type/del', {
            method: 'post',
            data: data
        })
    },
    // 商品类型修改接口
    PostmodifyCommoditytype (data) {
        return axios('/goods-type/modify', {
            method: 'post',
            data: data
        })
    }
}

export default requests
