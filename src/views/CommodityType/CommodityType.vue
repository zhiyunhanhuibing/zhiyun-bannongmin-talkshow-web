<template>
	<div class="content Commoditytype">
		<el-row :gutter="20">
			<!--商品管理左侧-->
			<el-col :span="7">
				<!--<div class="text-right">-->
					<!--<el-button type="text"><i class="el-icon-plus"></i>增加</el-button>-->
				<!--</div>-->
				<div class="LeftManagement">
					<span class="Lefttreetitel">商品类型 <el-button type="text" style="margin-left: 20px;" @click="Typeappend"><i class='el-icon-plus'></i></el-button></span>
					<!--树控件-->
					<el-tree :expand-on-click-node="false" :props="{label: 'name'}" :data="CommodityData" node-key="id"  @node-click="treeclick" :render-content="renderContent">
					</el-tree>
				</div>
			</el-col>
			<!--商品管理右侧-->
			<el-col :span="16">
				<div class="RightManagement">
					<section class="list">
                        <div style="width:70%">
                            <el-form label-width="80px">
                                <el-form-item label="父id">
                                    <el-input v-model="Typename.parentId" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="id">
                                    <el-input v-model="Typename.id" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="code">
                                    <el-input v-model="Typename.code" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="类型名称">
                                    <el-input v-model="Typename.name" :disabled="TypenameAsh"></el-input>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input v-model="Typename.describe" :disabled="DescribeAsh"></el-input>
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
            <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
                <el-form-item label="类型" prop="Types">
                    <el-input v-model="ruleForm.Types"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="Typenames">
                    <el-input v-model="ruleForm.Typenames"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="Describe">
                    <el-input v-model="ruleForm.Describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="AppendPopupCancel">取消</el-button>
                    <el-button type="primary" @click="AppendPopupSure('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
	</div>
</template>
<script>
    import axios from '@/views/CommodityType/CommodityType'
    export default {
        data(){
            return{
                // 添加时侯的校验
                rules: {
                    Types: [
                        {required: true, message: '请输入类型名称', trigger: 'blur'},
                        {required: true, validator: (rule,value,callback) => {
                            let reg = new RegExp('^[a-zA-Z0-9]+$');
                            if (!reg.test(value)) {
                                callback(new Error('仅可输入字母,数字,下划线'))
                            }
                        }, trigger: 'blur'}
					],
                    Typenames: [
                        {required: true, message: '请输入类型名称', trigger: 'blur' }
                    ],
                    Describe: [
                        {required: true, message: '请输入描述', trigger: 'blur' }
                    ],
				},
				// 增加弹框所填内容
                ruleForm: {
                    // 类型
                    Types: '',
                    // 描述
                    Describe: '',
                    // 类型名称
                    Typenames: '',
				},
				// 父元素id
                ParentId: '',
                // 弹窗头部title
                LeftIncreasetitle: '',
                // 左侧添加弹窗
                AppendPopup: false,
                // 是否显示保存按钮，fasle为隐藏，true为显示
                commodityPreservation: false,
                // 右侧描述输入框是否置灰,true为置灰,false为高亮
                DescribeAsh: true,
                // 右侧类型名称输入框是否置灰,true为置灰,false为高亮
                TypenameAsh: true,
                // 点击树控件返回的单个数据
                Typename: {},
                // 左侧树结构data
                CommodityData: []
            }
        },
        created() {
            this.LeftTrees()
        },
        methods: {
            Cancel () {
                this.commodityPreservation = false
                this.DescribeAsh = true
                this.TypenameAsh = true
			},
            // 左侧树data
            LeftTrees () {
                axios.PostCommoditytype().then(data => {
                    this.CommodityData=data.data
                })
            },
            // 左侧树添加事件
            Typeappend (data) {
                this.ruleForm.Types = ''
                this.ruleForm.Describe = ''
                this.ruleForm.Typenames = ''
                this.LeftIncreasetitle = "增加"
                this.ParentId = data.id
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
                        if (!this.ParentId) {
                            this.ParentId = ""
                        }
                        let prams={describe: this.ruleForm.Describe, parentId: this.ParentId, typeName: this.ruleForm.Typenames, type: this.ruleForm.Types}
                        console.log(prams)
                        axios.PostappendCommoditytype (prams).then(res => {
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
                if (!this.Typename.parentId) {
                    this.Typename.parentId = ""
				}
				if (!this.Typename.name) {
                    this.$message.error('请输入类型名称');
				} else {
                    let prams={describe: this.Typename.describe, id: this.Typename.id, parentId: this.Typename.parentId,type: this.Typename.code, typeName: this.Typename.name}
                    axios.PostmodifyCommoditytype(prams).then(res => {
                        if(res){
                            this.commodityPreservation = false
                            this.DescribeAsh = true
                            this.TypenameAsh = true
                        }
                    })
				}
            },
            // 点击修改按钮事件
            commomodify () {
                this.commodityPreservation = true
                this.DescribeAsh = false
                this.TypenameAsh = false
            },
            // 点击树控件的事件
            treeclick (data) {
                this.Typename = data
            },
            // 树控件右侧增加删除按钮
            renderContent (h, { node, data, store }) {
                if(node.level == 1){
                    return (
                        <span class="custom-tree-node">
                            <span><i class='el-icon-goods'></i>{node.label}</span>
                            <span style='padding-left: 30px;'>
                                <el-button type="text" on-click={ () => this.Typeappend(data) } ><i class='el-icon-plus'></i></el-button>
                            </span>
                        </span>
                    );
                }else if (node.level == 2) {
                    if(!data.children){
                        return (
							<span class="custom-tree-node">
								<span>{node.label}</span>
									<span style='padding-left: 30px;'>
									<el-button type="text" on-click={ () => this.Typeappend(data) } ><i class='el-icon-plus'></i></el-button>
									<el-button type="text" on-click={ () => this.Typeremove(node, data) }><i class='el-icon-delete'></i></el-button>
								</span>
							</span>
						);
					}else{
                        return (
                            <span class="custom-tree-node">
								<span>{node.label}</span>
								<span style='padding-left: 30px;'>
									<el-button type="text" on-click={ () => this.Typeappend(data) } ><i class='el-icon-plus'></i></el-button>
								</span>
                            </span>
                    );
					}
                }else{
                    return (
                        <span class="custom-tree-node">
							<span>{node.label}</span>
							<span style='padding-left: 30px;'>
								<el-button type="text" on-click={ () => this.Typeremove(node, data) }><i class='el-icon-delete'></i></el-button>
							</span>
                        </span>
                	);
				}

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
    .Commoditytype .is-current{
        background: #d1dbe5;
    }
    .el-breadcrumb{
        font-size: 16px;
    }
    .el-menu-item,.el-submenu__title{
        font-size: 16px;
    }
</style>