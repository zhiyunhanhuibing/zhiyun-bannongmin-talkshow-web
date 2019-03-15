<template>
	<div class="content Commoditytype">
		<el-row :gutter="20">
			<!--商品管理左侧-->
			<el-col :span="7">
				<!--<div class="text-right">-->
					<!--<el-button type="text"><i class="el-icon-plus"></i>增加</el-button>-->
				<!--</div>-->
				<div class="LeftManagement">
					<!-- <span class="Lefttreetitel">商品类型 <el-button type="text" style="margin-left: 20px;" @click="Typeappend"><i class='el-icon-plus'></i></el-button></span> -->
					<!--树控件-->
					<el-tree :expand-on-click-node="false" :props="{label: 'name'}" :data="userlimitData" node-key="id"  @node-click="treeclick" :render-content="renderContent">
					</el-tree>
				</div>
			</el-col>
			<!--商品管理右侧-->
			<el-col :span="16">
				<div class="RightManagement">
					<section class="list">
                        <div style="width:70%">
                            <el-form label-width="100px">
                                <el-form-item label="活动类型编码">
                                    <el-input v-model="Typename.activiType" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="活动名称">
                                    <el-input v-model="Typename.activityName" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="活动">
                                    <el-input v-model="Typename.describe" :disabled="DescribeAsh"></el-input>
                                </el-form-item>
                                <el-form-item label="满减活动减***"  v-if="Typename.activiType == 'full_reduction'">
                                    <el-input  v-model="Typename.reduce" :disabled="DescribeAsh"></el-input>
                                </el-form-item>
                                <el-form-item label="件数"  v-if="Typename.activiType == 'element_piece'">
                                    <el-input  v-model="Typename.chief" :disabled="DescribeAsh"></el-input>
                                </el-form-item>
                                <el-form-item label="活动时间" v-if="Typename.startTime">
                                    <el-date-picker v-model="Typename.startTime" type="datetime" placeholder="选择日期时间" :disabled="DescribeAsh"></el-date-picker>
                                    到
                                    <el-date-picker v-model="Typename.endTime" type="datetime" placeholder="选择日期时间" :disabled="DescribeAsh"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="图片" prop="filePath">
                                    <el-upload
                                            class="Fileupload"
                                            action="/plat/file/upload"
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess" :on-remove="handleRemove" :disabled="DescribeAsh">
                                        <img v-if="Typename.filePath" :src="Typename.filePath" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="commomodify">修改</el-button>
                                    <el-button type="primary" v-if="commodityPreservation" @click="Commoditypreser">保存</el-button>
                                    <el-button type="primary" v-if="commodityPreservation" @click="Cancel">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
					</section>
				</div>
			</el-col>
		</el-row>
        <!--添加弹窗-->
        <el-dialog :visible.sync="AppendPopup">
            <span slot="title" class="Increasetitle">{{ LeftIncreasetitle }}</span>
            <el-form :model="ruleForm" label-width="110px" :rules="rules" ref="ruleForm">
                <el-form-item label="活动类型编码">
                    <el-input v-model="ruleForm.activiType" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input v-model="ruleForm.activityName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="ruleForm.activityName" prop="Describe" >
                    <el-input  v-for="(item,index) in userlimitData" :key="index" v-model="ruleForm.Describe" v-if="item.code == ruleForm.activiType"></el-input>
                </el-form-item>
                <el-form-item label="满减活动减***" prop="Describe"  v-if="ruleForm.activiType == 'full_reduction'">
                    <el-input  v-model="ruleForm.reduce"></el-input>
                </el-form-item>
                <el-form-item label="件数" prop="Describe"  v-if="ruleForm.activiType == 'element_piece'">
                    <el-input  v-model="ruleForm.chief"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="startTime">
                    <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    到
                    <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="图片" prop="filePath">
                    <el-upload
                            class="Fileupload"
                            action="/plat/file/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="ruleForm.filePath" :src="ruleForm.filePath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="primary" @click="AppendPopupCancel">取消</el-button>
                    <el-button type="primary" @click="AppendPopupSure('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
	</div>
</template>

<script>
    import axios from '@/views/Userlimit/userlimit'
    import moment from 'moment';
    export default {
        data(){
            return{
                // 添加时侯的校验
                rules: {
                    Describe: [
                        {required: true, message: '请输入活动', trigger: 'blur' }
                    ],
                    startTime: [
                        {required: true, message: '请输入时间' }
                    ],
                    filePath: [
                        {required: true, message: '请添加图片' }
                    ],
				},
				// 增加弹框所填内容
                ruleForm: {
                    // 类型
                    activiType: '',
                    // 描述
                    activityName: '',
                },
                // 弹窗头部title
                LeftIncreasetitle: '',
                // 左侧添加弹窗
                AppendPopup: false,
                // 是否显示保存按钮，fasle为隐藏，true为显示
                commodityPreservation: false,
                // 右侧输入框是否置灰,true为置灰,false为高亮
                DescribeAsh: true,
                // 点击树控件返回的单个数据
                Typename: {},
                // 左侧树结构data
                userlimitData: []
            }
        },
        created() {
            this.LeftTrees()
        },
        methods: {
            // 图片删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 图片上传成功时候的事件
            handleAvatarSuccess2 (file) {
                this.Typename.filePath = file.filePath;
                this.Typename.fileOriginalName = file.fileOldName
                this.Typename.fileName = file.fileName
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            // 图片上传成功时候的事件
            handleAvatarSuccess (file) {
                this.ruleForm.filePath = file.filePath;
                this.ruleForm.fileOriginalName = file.fileOldName
                this.ruleForm.fileName = file.fileName
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            // 右侧取消按钮事件
            Cancel () {
                this.commodityPreservation = false
                this.DescribeAsh = true
			},
            // 左侧树data
            LeftTrees () {
                axios.Getuserlimittype('activity').then(data => {
                    this.userlimitData=data.data
                })
            },
            // 左侧添加按钮事件
            Typeappend (data) {
                this.ruleForm = {activiType: data.code,activityName: data.name}
                this.AppendPopup = true
            },
            // 左侧弹窗的取消按钮事件
            AppendPopupCancel () {
                this.ruleForm.Types = ''
				this.ruleForm.Describe = ''
				this.ruleForm.Typenames = ''
                this.AppendPopup = false
            },
            // 左侧弹窗的确定按钮事件
            AppendPopupSure (formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        if (this.ruleForm.activiType == 'element_purch') {
                            this.ruleForm.yg = this.ruleForm.Describe
                        }else if(this.ruleForm.activiType == 'add_price_purch') {
                            this.ruleForm.addPrice = this.ruleForm.Describe
                        }else if(this.ruleForm.activiType == 'full_reduction') {
                            this.ruleForm.addPrice = this.ruleForm.Describe
                        }else if(this.ruleForm.activiType == 'element_piece') {
                            this.ruleForm.piece = this.ruleForm.Describe
                        }else if(this.ruleForm.activiType == 'limit_time_discount') {
                            this.ruleForm.discount = this.ruleForm.Describe
                        }
                        if (this.ruleForm.startTime) {
                            this.ruleForm.startTime = moment(this.ruleForm.startTime/1000).valueOf()
                        }
                        if (this.ruleForm.endTime) {
                            this.ruleForm.endTime = moment(this.ruleForm.endTime/1000).valueOf()
                        }
                        let prams = this.ruleForm
                        console.log(prams)
                        axios.Addactivityinformation (prams).then(res => {
                            if(res){
                                this.AppendPopup = false
                                this.LeftTrees()
                            }
                        }).catch(() => {});
                    }
				})
            },
            // 左侧树删除事件
            Typeremove (node,data) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let prams=[data.id]
                    axios.PostdelCommoditytype (prams).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.LeftTrees()
						this.Typename = {}
					}).catch(() => {})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //点击保存按钮事件
            Commoditypreser () {
				if (!this.Typename.name) {
                    this.$message.error('请输入类型名称');
				} else {
                    let prams={describe: this.Typename.describe, id: this.Typename.id ,type: this.Typename.code, typeName: this.Typename.name}
                    axios.Modifyactivityinformation(prams).then(res => {
                        if(res){
                            this.commodityPreservation = false
                            this.DescribeAsh = true
                        }
                    })
				}
            },
            // 点击修改按钮事件
            commomodify () {
                this.commodityPreservation = true
                this.DescribeAsh = false
            },
            // 点击树控件的事件
            treeclick (data) {
                let prams = {activiType: data.code,activityName :data.name}
                axios.Queryactivityinformation(prams).then(res => {
                    if(res){
                        // this.Typename = res
                        console.log(res.data)
                        this.Typename = res.data
                        if (this.Typename.activiType == 'element_purch') {
                            this.Typename.describe = this.Typename.yg
                        }else if(this.Typename.activiType == 'add_price_purch') {
                            this.Typename.describe = this.Typename.addPrice
                        }else if(this.Typename.activiType == 'full_reduction') {
                            this.Typename.describe = this.Typename.addPrice
                        }else if(this.Typename.activiType == 'element_piece') {
                            this.Typename.describe = this.Typename.piece
                        }else if(this.Typename.activiType == 'limit_time_discount') {
                            this.Typename.describe = this.Typename.discount
                        }
                    }
                })
            },
            // 树控件右侧增加删除按钮
            renderContent (h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                        <span><i class='el-icon-goods'></i>{node.label}</span>
                        <span style='padding-left: 30px;'>
                            <el-button type="text" on-click={ () => this.Typeappend(data) } ><i class='el-icon-plus'></i></el-button>
                        </span>
                    </span>
                );

            }
        }
    }

</script>

<style scoped>
    
	.Lefttreetitel{
		display: block;
		height: 40px;
		line-height: 40px;
		padding-left: 25px;
        font-size: 16px;
	}
    .Increasetitle{
        font-size:24px;
        margin-left: 50%;
    }
    .custom-tree-span{
        padding-left: 30px;
    }
    .custom-tree-node{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
	.list{
		width: 96%;
		border:1px solid #cccccc;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		min-height: 800px;
		padding-top: 30px;
        padding-left: 10%;
	}
	.LeftManagement{
		border:1px solid #cccccc;
		min-height: 800px;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
        overflow: hidden;
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
	.el-tree{
		border: none;
	}
</style>
<style>
    .Commoditytype .el-tree span{
        font-size: 16px;
    }
    .Commoditytype .is-current{
        background: #d1dbe5;
    }
    .el-breadcrumb{
        font-size: 16px;
    }+ 
    .el-menu-item,.el-submenu__title{
        font-size: 16px;
    }
</style>