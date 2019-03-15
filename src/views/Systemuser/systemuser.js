import axios from "../../api/axios"

const require = {
    postExit(){
        return axios('/ststem-user-login/exit',{
            method:'post'
        })
    },
    postSign() {
        return axios('/ststem-user-login/sign-in',{
            method:"post"
        })
    },
    postUseradd() {
        return axios('/system-user/del',{
            method: "post",
        })
    },
    postUsermodify() {
        return axios('/system-user/modify',{
            method:"post",
        })
    },
    postUserquery() {
        return axios('/system-user/modify',{
            method:"post",
        })
    }
}
export default require