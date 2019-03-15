<template>		
    <div class="bg1">    
       
             
        <div id="articlelist">  
                <img src="http://i.dyt7.cc/85/fd/fe/46/20/a8/79/81/e7/8c/03/c7/1f/b6/dc/ab.jpg" height="450" width="100%" >
            <div class="line">
                    <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1" @click="toMyNote">管理笔记</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">ElementUI</a></el-menu-item>
                  </el-menu> 
            </div>
              
            <ui>
                <li v-for="article in articlelist" >
                    <span> {{article.updatetime}} </span>
                    <h4> 
                    <router-link :to="{path:'/showArticle',query:{article_uuid:article.article_uuid}}">  {{article.article_title}} </router-link>
                    <router-link tag="li" to="/showArticle">
                    </router-link>
                    </h4>
                       <p> 摘要：{{article.article_title}}</p>
                </li>
            </ui>
        </div>
    </div>		
    </template>
    <script>
    import axios from '@/views/MyNote/myNote';
    import moment from "moment";
    export default {
        data () {
            return {
            activeIndex: '1',
            activeIndex2: '1',
            labelPosition: 'right',
            dialogFormVisible:false,
            dialogFormVisible1:false,
                form:{
                    tel: '',
                    weixin: '',
                    startLimitTime:'',
                    endLimitTime: '',
                },
                formDate:{
                    userName:'',
                    address:'',
                    tel: '',
                    weixin: '',
                    limitTime:'',
                },
                articlelist:[],
                datalist:[],
                currentPage: 1,
                totalPage: 0
            }
        },
        created(){
            this.search();
        },
        methods: {
            dateFormat: function(row, column) {
            var data = row[column.property];
            if (data == undefined) {
                return "";
            }
            return moment(data).format("YYYY-MM-DD HH:mm:ss");
            },
            handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
            this.currentPage = val;
            },
            formatter(row,column){
                return row.address;
            },
           
            //查询接口后台数据
            search() {
                let postSearch = Object.assign({},this.form);
                axios.systemQuery({
                    postSearch
                }).then((res) => {
                    console.log(res);
                    this.articlelist=res.data.items;
                    this.articlelist.forEach(element => {
                        element.updatetime = moment(element.updatetime).format("YYYY-MM-DD HH:mm:ss");
                    });
                    this.id = res.items.id;
                    this.currentPage = res.data.currentPage;
                    this.totalPage = res.data.totalNum;
                    console.log(this.list);
                }).catch((err) => {
                    console.log(err);
                })
            },
            //跳转至写笔记界面
			toMyNote: function () {
				var _this = this;
				_this.$router.push('/myNote');
			},
                //跳转至写笔记
                toWriteNote: function () {
                    var _this = this;
                    _this.$router.push('/writeNote');
                },
             handleSelect(key, keyPath) {
                 console.log(key, keyPath);
              },
        },
    };
    </script>
    <style scoped>   
            #articlelist{
                width: 1300px;
                margin:auto;
                position: relative;
            }
            .line{
                position: absolute;
                top:-70px;
            }
            li{
                list-style: none;
                border-bottom:1px dashed #00A1E7;              
                padding-left: 20px;
                background: #FFFFFF;
            }
            li h4{
                display: inline-block;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
            }
            span{
                width: 220px;
                text-align: center;
                color: white;
                margin-right: 10px;
                height: 35px;
                line-height: 35px;
                background: #00A1E7;
                display: inline-block;
                cursor: pointer;
            }
            span:hover{
                background: #ff5144;
            }
            .bg1{
                background: #F1eff6;
            }
            .top{
                background-image: -o-linear-gradient()
            }
        </style>
    <!-- 引入样式 -->
    <!-- <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"> -->
    <style >
    .el-dialog--small {
      width: 50%;
    }
    
    </style>

    