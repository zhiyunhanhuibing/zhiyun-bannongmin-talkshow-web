<template>		
    <div class="bg1">     
         <img src="https://ss1.bdstatic.com/5aAHeD3nKgcUp2HgoI7O1ygwehsv/media/ch1/jpg/chunwantututu.jpg" height="100%" width="100%" >
             
                
        <div id="articlelist">  
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
                   <el-menu-item index="1" @click="toMyBlog">我的博客</el-menu-item>
                    <el-menu-item index="1" @click="toWriteNote">写笔记</el-menu-item>
                  </el-menu> 
            </div>
              
            <ui>
                    <h4> 
                    {{article_title}}
                    </h4>
                       <p> 摘要：<div id="article_content" v-html="article_content"></div></p>

            </ui>
        </div>
    </div>		
    </template>
    <script>
    import axios from '@/views/MyNote/showArticle';
    export default {
        data () {
            return {
                article_title: '',
                article_uuid:'',
                article_content:'',
            }
        },
        created(){
            this.article_uuid = this.$route.query.article_uuid;
            this.search();
        },
        methods: {
            //查询接口后台数据
            search() {              
                axios.systemQuery({
                    article_uuid:this.article_uuid  
                }).then((res) => {
                    console.log(res);
                    this.article_title = res.data.article_title;
                    this.article_content=res.data.article_content;
                }).catch((err) => {
                    console.log(err);
                })
            }, //跳转至写笔记界面
			toMyNote: function () {
				var _this = this;
				_this.$router.push('/myNote');
			},
                //跳转至写笔记
                toWriteNote: function () {
                    var _this = this;
                    _this.$router.push('/writeNote');
                },
                //跳转至博客页
			toMyBlog: function () {
				var _this = this;
				_this.$router.push('/myBlog');
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
                top:-90px;
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
                width: 140px;
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
    <style >
    .el-dialog--small {
      width: 50%;
    }
    
    </style>

    