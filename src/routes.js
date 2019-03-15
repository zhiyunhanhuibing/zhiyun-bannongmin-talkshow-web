import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Dictionaries from './views/Dictionaries/dictionaries.vue'
import User from './views/User/user.vue'
import CommodityType from './views/CommodityType/CommodityType.vue'
import Commodity from './views/Commodity/commodity.vue'
import Ordermastertable from './views/Ordermastertable/ordermastertable.vue'
import Systemuser from './views/Systemuser/systemuser.vue'
import Pictureuploading from './views/Pictureuploading/pictureuploading.vue'
import receivingaddress from './views/ReceivingAddress/receivingaddress.vue'
import Userlimit from './views/Userlimit/userlimit.vue'
import UserName from './views/UserName/userName.vue'
import Role from './views/Role/role.vue'
import MyNote from './views/MyNote/myNote.vue'
import WriteNote from './views/MyNote/writeNote.vue'
import MyBlog from './views/MyNote/myBlog.vue'
import ShowArticle from './views/MyNote/showArticle.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        hidden: true
    },

    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    }, //  //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-message', //图标样式class
        leaf: true,
        children: [
            {
                path: '/Dictionaries',
                component: Dictionaries,
                name: '字典管理',
                hidden: true
            }
        ]
  },{
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-message', //图标样式class
        leaf: true,
        children: [
            {
                path: '/MyNote',
                component: MyNote,
                name: '我的笔记'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-id-card-o',
        leaf: true,
        children: [
            {
                path: '/User',
                component: User,
                name: '用户管理'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-address-card',
        children: [
            {
                path: '/Commodity',
                component: Commodity,
                name: '商品管理'
            },
            {
                path: '/CommodityType',
                component: CommodityType,
                name: '商品类型管理'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true, //只有一个节点
        children: [
            {
                path: '/Ordermastertable',
                component: Ordermastertable,
                name: '订单主表管理'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,
        children: [
            {
                path: '/Pictureuploading',
                component: Pictureuploading,
                name: '图片上传'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,
        children: [
            {
                path: '/receivingaddress',
                component: receivingaddress,
                name: '收货地址管理'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-message', //图标样式class
        leaf: true,
        children: [
            {
                path: '/Userlimit',
                component: Userlimit,
                name: '活动管理',
                hidden: true
            }
        ]
  },
    {
        path: '/',
        component: Home,
        name:'',
        iconCls: 'fa el-icon-menu',
        leaf: true,
        children: [
            {
                path: '/systemuser',
                component :Systemuser,
                name:'系统用户管理'
            }
        ]
    },
    {
        path: '/',
        component:Home,
        name:'',
        leaf: true,
        children: [
            {
                path: '/UserName',
                component: UserName,
                name:'用户管理',
                hidden:true
            }
        ]

    },{
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        children:[
            {
                path: '/Role',
                component: Role,
                name: '角色管理',
                hidden :true,
            }
        ]
    },{
        path: '/writeNote',
        component: WriteNote
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    } ,
    {
        path: '/myBlog',
        component: MyBlog,
        hidden: true
    },

    {
        path: '/showArticle',
        component: ShowArticle,
        hidden: true
    },
];

export
default routes;