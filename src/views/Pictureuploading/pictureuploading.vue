<template>
    <div class="content">
        <el-row :gutter="20">
            <!--商品管理左侧-->
            <el-col :span="4">
                <div class="LeftManagement">
                    <!--左侧增加按钮-->
                    <!--<div class="text-right">-->
                        <!--<el-button type="text"><i class="el-icon-plus"></i>增加</el-button>-->
                    <!--</div>-->
                    <!--左侧列表-->
                    <el-table ref="leftdatatable" :data="lefttabledata" highlight-current-row @current-change="Clickleftlist" style="min-height: 800px;">
                        <el-table-column prop="name" label="文件类型"></el-table-column>
                    </el-table>
                    <!--树控件-->
                    <!--<el-tree :data="CommodityData" @node-click="treeclick">-->
                    <!--</el-tree>-->
                </div>
            </el-col>
            <!--商品管理右侧-->
            <el-col :span="20">
                <div class="RightManagement">
                    <!--右侧增加,查询按钮-->
                    <div class="text-right">
                        <el-button type="text" @click="RightIncrease"><i class="el-icon-plus"></i>增加</el-button>
                        <el-button type="text" @click="RightQuery"><i class="el-icon-caret-bottom" v-show="RightQueryIcon"></i><i class="el-icon-caret-top" v-show="!RightQueryIcon"></i>查询</el-button>
                    </div>
                    <!--右侧查询弹出框-->
                    <div class="queryinter queryinterhide">
                        <el-form v-model='QueryButton' label-width="80px">
                            <el-form-item label="文件类型">
                                <el-input v-model="QueryButton.fileType" :disabled='true'></el-input>
                            </el-form-item>
                            <el-form-item label="文件名称">
                                <el-input v-model="QueryButton.fileName"></el-input>
                            </el-form-item>
                            <el-form-item label="文件原名">
                                <el-input v-model="QueryButton.fileOriginalName"></el-input>
                            </el-form-item>
                            <el-form-item label="文件路径">
                                <el-input v-model="QueryButton.filePath"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="queryReset">重置</el-button>
                                <el-button type="primary" @click="queryAdd">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--列表内容-->
                    <section class="list">
                        <el-table :data="tabledata">
                            <el-table-column prop="fileName" label="文件名称"></el-table-column>
                            <el-table-column prop="showStartTime" :formatter="dateFormat" label="开始时间"></el-table-column>
                            <el-table-column prop="showEndTime" :formatter="dateFormat" label="结束时间"></el-table-column>
                            <el-table-column prop="url" label="页面链接"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="Editlist(scope.row)">编辑</el-button>
                                    <el-button type="text" @click="Deletelist(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </section>
                </div>
            </el-col>
        </el-row>
        <!--右侧增加弹出框-->
        <el-dialog :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
            <span slot="title" class="RightIncreasetitle">{{ boxtitle }}</span>
            <el-form v-model='IncreasePopup' label-position="right" label-width="80px">
                <el-form-item label="文件类型">
                    <el-input v-model='IncreasePopup.fileType' :disabled='true'></el-input>
                </el-form-item>
                <el-form-item label="文件原名">
                    <el-input v-model='IncreasePopup.fileOriginalName' :disabled='true'></el-input>
                </el-form-item>
                <el-form-item label="文件名称">
                    <el-input v-model='IncreasePopup.fileName' :disabled='true'></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-upload
                            class="Fileupload"
                            action="/plat/file/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="IncreasePopup.filePath" :src="IncreasePopup.filePath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="IncreasePopup.showStartTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="IncreasePopup.showEndTime"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="url链接">
                    <el-input v-model='IncreasePopup.url'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="danger" @click="FileuploadCancel">取消</el-button>
                <el-button type="primary" @click="FileuploadConfirm">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from '@/views/Pictureuploading/pictureuploading'
    import moment from 'moment';
    export default {
        data(){
            return{
                // 查询内容
                QueryButton: {},
                // 点击右侧的获取的typeos
                typeos: '',
                // 添加文件内容
                IncreasePopup: {
                    // 文件上传成功后的返回的img地址
                    filePath: '',
                },
                // 弹出框标题
                boxtitle: '',
                // 新增文件时的结束时间
                EndTime: '',
                // 新增文件时的开始时间
                StartTime: '',
                // 文件上传成功后的返回的img信息
                imagefile: {},
                // 增加弹窗 false消失，true显示
                dialogVisible: false,
                // 左边查询图标向上向下，true向上，false向下
                LeftQueryIcon: true,
                // 右边查询图标向上向下，true向上，false向下
                RightQueryIcon: true,
                // 左侧树结构data
                lefttabledata: [],
                // 右侧列表data
                tabledata : [],
            }
        },
        created() {
            this.FileTypeRight()
        },
        methods: {
            // 查询确认按钮
            queryAdd () {
                let prams=this.QueryButton
                this.QueryFiles(prams)
                $('.queryinter').toggleClass('queryinterdisplay').toggleClass('queryinterhide')
            },
            // 编辑按钮事件
            Editlist (data) {
                this.IncreasePopup = data
                this.IncreasePopup.fileOldName = data.fileName
                this.boxtitle = '修改'
                this.dialogVisible = true
            },
            // 删除按钮事件
            Deletelist (data) {
                console.log(data)
                let prams={fileType: data.fileType,fileName: data.fileName,fileOriginalName: data.fileOriginalName,filePath: data.filePath}
                axios.DeleteFile(prams).then(res =>{
                    this.$message({
                        message: res.data.statusMessage,
                        type: 'success'
                    });
                    let prams2={fileType: this.typeos}
                    this.QueryFiles(prams2)
                })
            },
            // 转换获取时间
            dateFormat:function(row,column) {
                var data = row[column.property];
                if(data ==undefined) {
                    return '';
                }
                return moment(data).format("YYYY-MM-DD HH:mm:ss")
            },
            // 文件内容查询
            QueryFiles (prams) {
                axios.QueryFile (prams) .then(res =>{
                    this.tabledata = res.data
                })
            },
            // 右侧列表data
            FileTypeRight () {
                axios.FileType("notice").then(res =>{
                    this.lefttabledata = res.data
                })
            },
            // 查询重置按钮事件
            queryReset () {
                this.QueryButton={
                    fileType: this.typeos
                }
                let prams2={fileType: this.typeos}
                this.QueryFiles(prams2)
            },
            // 单击左侧列表事件
            Clickleftlist (val) {
                // console.log(val.code)
                let prams={fileType:val.code}
                this.typeos = val.code
                this.QueryFiles(prams)
            },
            // 右侧增加弹框的确认按钮事件
            FileuploadConfirm () {
                if (this.IncreasePopup.showStartTime) {
                    this.IncreasePopup.showStartTime = moment(this.IncreasePopup.showStartTime/1000).valueOf()
                }
                if (this.IncreasePopup.showEndTime) {
                    this.IncreasePopup.showEndTime = moment(this.IncreasePopup.showEndTime/1000).valueOf()
                }
                if (this.IncreasePopup.createTime) {
                    this.IncreasePopup.createTime = moment(this.IncreasePopup.createTime/1000).valueOf()
                }
                if (this.IncreasePopup.updateTime) {
                    this.IncreasePopup.updateTime = moment(this.IncreasePopup.updateTime/1000).valueOf()
                }
                let prams=this.IncreasePopup
                console.log(prams)
                // if (this.boxtitle == '增加') {
                //     axios.AddFile(prams).then(res =>{
                //         this.$message({
                //             message: res.data.statusMessage,
                //             type: 'success'
                //         });
                //         this.dialogVisible = false
                //         let prams2={fileType: this.typeos}
                //         this.QueryFiles(prams2)
                //     })
                // }else{
                //     axios.ModifyFile(prams).then(res =>{
                //         this.$message({
                //             message: res.data.statusMessage,
                //             type: 'success'
                //         });
                //         this.dialogVisible = false
                //         let prams2={fileType: this.typeos}
                //         this.QueryFiles(prams2)
                //     })
                //     console.log(prams)
                // }
            },
            // 右侧增加弹框的取消按钮事件
            FileuploadCancel () {
                this.dialogVisible = false
            },
            // 上传成功时候的事件
            handleAvatarSuccess (file) {
                this.IncreasePopup.filePath = file.filePath;
                this.IncreasePopup.fileOriginalName = file.fileOldName
                this.IncreasePopup.fileName = file.fileName
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            // 右侧增加按钮点击操作
            RightIncrease () {
                if (this.typeos) {
                    this.boxtitle = '增加'
                    this.dialogVisible = true
                    this.IncreasePopup = {
                        fileType: this.typeos
                    }
                }else{
                    this.$message.error('请选择文件类型');
                }
            },
            // 右侧查询按钮点击操作
            RightQuery () {
                if (this.typeos) {
                    this.RightQueryIcon = !this.RightQueryIcon
                    $('.queryinter').toggleClass('queryinterdisplay').toggleClass('queryinterhide')
                    this.QueryButton={
                        fileType: this.typeos
                    }
                }else{
                    this.$message.error('请选择文件类型');
                }
                
            },
            // 左侧查询按钮点击操作
            LeftQuery () {
                this.LeftQueryIcon = !this.LeftQueryIcon
            },
            // 点击树控件的事件
            // treeclick (data) {
            //     if (!data.children) {
            //         console.log(data);
            //     }
            // }
        }
    }

</script>

<style scoped>
    .LeftManagement{
        margin-top: 34px;
    }
    /*查询弹框样式*/
    .queryinter{
        width:300px;
        padding-left: 20px;
        padding-right: 20px;
        position: absolute;
        z-index: 900;
        background: #ffffff;
        right: 0;
        top: 30px;
        overflow: hidden;
    }
    .queryinterhide{
        padding-top: 0px;
        padding-bottom: 0px;
        height:0px;
        border:1px solid #ffffff;
        transition: all .2s;
    }
    .queryinterdisplay{
        padding-top: 20px;
        padding-bottom: 10px;
        height:280px;
        border:1px solid #cccccc;
        transition: all .5s;
    }
    /*右侧弹出框头部样式*/
    .RightIncreasetitle{
        font-size:24px;
        margin-left: 50%;
    }
    .wid{
        width:30%;
    }
    .text-right{
        text-align: right;
    }
    .lf{
        float:left;
    }
    .rg{
        float:right;
    }
    .content{
        padding-top:30px;
    }
    .el-table{
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .el-dialog--small{
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
</style>
<style>
    .el-table__row{
        cursor: pointer;
    }
    .Fileupload .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        /*position: relative;*/
        /*overflow: hidden;*/
    }
    .Fileupload .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>