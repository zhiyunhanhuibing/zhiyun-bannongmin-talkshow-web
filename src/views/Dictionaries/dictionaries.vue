<template>
	<div style="margin-top: 10px;" class="dic">
		<el-row :gutter="10">
			<!-- left -->
			<el-col :span="5">
				<div class="left">
					<div class="function-btn">
						<div><span>添加</span><i class="fa fa-plus-square-o pointer" @click="titAddDialog"></i></div>
					</div>
					<div class="left-data">
						<span v-for="(data,index) in commodityData" :class="{ bgColor:changeBack == index}" @click="change(index)">
							<em class="pointer" @click="queryDict(data)">{{data.describe}}</em>
							<i class="fa fa-trash pointer" @click="titDelClick(data)"></i>
							<i class="fa fa-edit pointer" @click="titModifyClick(data)"></i>
						</span>
					</div>
				</div>
			</el-col>
			<!-- right -->
			<el-col :span="19">
				<div class="function-btn" style="float: right;">
					<div class="del pointer" @click="rightDelClick">
						<i class="fa fa-trash"></i><span>删除</span>
					</div>
					<div><span>添2加</span><i class="fa fa-plus-square-o pointer" @click="dictAddClick"></i></div>
				</div>
				<div>
					<el-table :data="tableData" style="width: 100%;" @selection-change="check">
						<el-table-column type="selection" width="40"></el-table-column>
						<el-table-column prop="type" label="类型编码" sortable width="180"></el-table-column>
						<el-table-column prop="code" label="字典值编码" sortable width="180"></el-table-column>
						<el-table-column prop="name" label="字典值" sortable width="180"></el-table-column>
						<el-table-column prop="sql" label="SQL" sortable width="180"></el-table-column>
						<el-table-column prop="database" label="数据源" sortable width="180"></el-table-column>
						<el-table-column fixed="right" label="操作" width="100">
							<template slot-scope="scope"> 
								<el-button type="text" size="small" @click.native.prevent="dictModifyClick(scope.$index, tableData)">修改</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<!--修改开始-->
		<el-dialog :title="titName" :visible.sync="dialogShow" class="el-dialogt titadd-dialog" :show-close="false" :close-on-click-modal="false">
			<el-form :model="dialogCont" label-width="150px" size="small" class="add-form" :rules="rules" ref="dialogCont">
				<el-form-item label="类型" prop="type">
					<el-input type="text" :maxlength="100" v-model="dialogCont.type"></el-input>
				</el-form-item>
				<el-form-item label="类型描述" prop="describe">
					<el-input type="text" :maxlength="100" v-model="dialogCont.describe"></el-input>
				</el-form-item>
				<el-form-item label="是否SQL">
					<el-select placeholder="请选择" v-model="dialogCont.isSql" :maxlength="100">
						<el-option key="0" value="0" label="否"> </el-option>
						<el-option key="1" value="1" label="是"> </el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" v-if="addTitShow" @click="confirmAdd(dialogCont, 'dialogCont')">确定</el-button>
					<el-button type="primary" v-if="modifyTitShow" @click="confirmModify(dialogCont, 'dialogCont')">确定</el-button>
					<el-button @click="cancelClick('dialogCont')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog :title="titName" :visible.sync="dialogShow2" class="el-dialogt titadd-dialog" :show-close="false" :close-on-click-modal="false">
			<el-form :model="dialogCont2" label-width="150px" size="small" class="add-form" :rules="rules2" ref="dialogCont2">
				<el-form-item label="字典值编码" prop="code">
					<el-input type="text" :maxlength="100" v-model="dialogCont2.code"></el-input>
				</el-form-item>
				<el-form-item label="字典值"  prop="name">
					<el-input type="text" :maxlength="100" v-model="dialogCont2.name"></el-input>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" v-if="rightAddShow" @click="rightAddClick(dialogCont2, 'dialogCont2')">确定</el-button>
					<el-button type="primary" v-if="rightModifyShow" @click="rightModifyClick(dialogCont2, 'dialogCont2')">确定</el-button>
					<el-button @click="cancelClick('dialogCont2')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog :title="titName" :visible.sync="dialogShow3" class="el-dialogt titadd-dialog" :show-close="false" :close-on-click-modal="false">
			<el-form :model="dialogCont3" label-width="150px" size="small" class="add-form" :rules="rules3" ref="dialogCont3">
				<el-form-item label="字典值编码" prop="code">
					<el-input type="text" :maxlength="100" v-model="dialogCont3.code"></el-input>
				</el-form-item>
				<el-form-item label="字典值"  prop="name">
					<el-input type="text" :maxlength="100" v-model="dialogCont3.name"></el-input>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" v-if="rightAddShow" @click="rightAddClick(dialogCont3, 'dialogCont3')">确定</el-button>
					<el-button type="primary" v-if="rightModifyShow" @click="rightModifyClick(dialogCont3, 'dialogCont3')">确定</el-button>
					<el-button @click="cancelClick('dialogCont3')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!--修改结束-->
	</div>
</template>

<script>
	import axios from '@/views/Dictionaries/dictionaries';
	export default {
		data() {
      		return {
          		dialogShow3: false,
          		dialogShow2: false,
				changeBack: -1,
				// 添加校验
				rules: {
					type: [
						{required: true, message: '请输入类型', trigger: 'blur'}
					],
					describe: [
						{required: true, message: '请输入描述', trigger: 'blur'}
					],
				},
          		rules2: {
					code: [
						{required: true, message: '请输入字典类型值', trigger: 'blur'}
					],
					name: [
						{required: true, message: '请输入字典值', trigger: 'blur'}
					]
				},
				rules3: {
					sql: [
						{required: true, message: '请输入SQL', trigger: 'blur'}
					],
					database: [
						{required: true, message: '请输入数据源', trigger: 'blur'}
					],
				},
				// 弹框显示
				dialogShow: false,
				// 添加左侧标题
				addTitShow: false,
				// 修改左侧标题
				modifyTitShow: false,
				// 添加右侧
				rightAddShow: false,
				// 右侧弹框内容显示
				rightContentShow: false,
				// 右侧修改
				rightModifyShow: false,
				// 右侧弹框显示的判断
				isSql1: false, 
				// 弹框标题
				titName: '',
				// 弹框的值1
				dialogCont: {
					id: '',
					type: '',
					describe: '',
					isSql: '0',
					code: '',
					name: '',
					sql: '',
					database: ''
				},
				// 弹框的值2
				dialogCont2: {
					id: '',
					isSql: '0',
					code: '',
					name: '',
				},
				// 弹框的值3
				dialogCont3: {
					id: '',
					isSql: '0',
					code: '',
					name: '',
				},
				// isSql的值
				isSql: '',
				// 左侧信息
				commodityData: [],
				// 右侧表格内容信息
				tableData: [],
				// 右侧选中的内容
				arrRightContent: [],
				// 查询右侧信息需要的type
				rightParam: '',
				typeParam: ''
      		}
		},
		created () {
			this.queryTit()
		},
    	methods: {
			change(index) {
				this.changeBack = index
			},
			// 取消弹框
			cancelClick (rulesName) {
				this.dialogShow2 = false
                this.dialogShow = false
				this.$refs[rulesName].resetFields()
			},
			// 查询左侧信息
			queryTit () {
				axios.PostTypeQuery().then(data => {
					this.commodityData = data.data
					this.typeParam = this.commodityData[0].type
					axios.PostQueryDict({type: this.typeParam}).then(data => {
						this.tableData = data.data
					})
				})
			},
			// 添加左侧标题弹框
			titAddDialog (data) {
				this.dialogShow = true
				this.addTitShow = true
				this.rightContentShow = false
				this.rightAddShow = false
				this.modifyTitShow = false
				this.rightModifyShow = false
				this.dialogCont.type = ''
				this.dialogCont.describe = ''
				this.titName = '新增目录标题'
			},
			// 添加左侧标题
			confirmAdd (data, rulesName) {
				this.$refs[rulesName].validate((valid) => {
					if(valid){
						let param = {
							type: data.type,
							describe: data.describe,
							isSql: data.isSql
						}
						axios.PostTypeAdd (param).then(res => {
							if (res) {
								this.dialogShow = false
								this.dialogShow2 = false
								this.dialogShow3 = false
								this.queryTit()
							}
						}).catch(() => {})
					}
				})
			},
			// 左侧修改标题弹框
			titModifyClick (data) {
				this.dialogShow = true
				this.modifyTitShow = true
				this.addTitShow = false
				this.rightAddShow = false
				this.rightContentShow = false
				this.rightModifyShow = false
				this.dialogCont.type = data.type
				this.dialogCont.describe = data.describe
				this.dialogCont.isSql = data.isSql
				this.titName = '修改目录标题'
			},
			// 确定修改标题
			confirmModify (data, rulesName) {
				this.$refs[rulesName].validate((valid) => {
					if(valid){
						axios.PostTypeModify(data).then(res => {
							if(res){
								this.dialogShow = false
								this.dialogShow3 = false
								this.dialogShow2 = false
								this.queryTit()
							}
						})
					}
				})
			},
			// 查询右侧信息
			queryDict (data) {
				this.isSql = data.isSql
				this.rightParam = data
				axios.PostQueryDict({type: data.type}).then(data => {
					this.tableData = data.data
				})
			},
			// 添加右侧内容
			dictAddClick () {
				let _this = this
				if (this.isSql1) {
                    this.dialogShow3 = true
                    this.dialogCont3.type = this.rightParam.type
                    this.dialogCont3.describe = this.rightParam.describe
                    this.dialogCont3.isSql = this.rightParam.isSql
                    this.dialogCont3.code = ''
                    this.dialogCont3.name = ''
                    this.dialogCont3.database = ''
                    this.dialogCont3.sql = ''
				}else{
                    this.dialogShow2 = true
                    this.dialogCont2.type = this.rightParam.type
                    this.dialogCont2.describe = this.rightParam.describe
                    this.dialogCont2.isSql = this.rightParam.isSql
                    this.dialogCont2.code = ''
                    this.dialogCont2.name = ''
                    this.dialogCont2.database = ''
                    this.dialogCont2.sql = ''
				}

				this.addTitShow = true
				this.rightContentShow = true
				this.rightAddShow = true
				this.addTitShow = false
				this.modifyTitShow = false
				this.rightModifyShow = false
				this.titName = '新增字典值'
				if (this.rightParam.isSql == '1') {
					_this.isSql1 = true
				} else {
					_this.isSql1 = false
				}
			},
			// 确定添加右侧内容
			rightAddClick (data, rulesName) {
				this.$refs[rulesName].validate((valid) => {
					if(valid){
						if(this.isSql1) {
							var param = {
								sql: data.sql,
								database: data.database,
								type: this.rightParam.type
							}
						} else {
							var param = {
								code: data.code,
								name: data.name,
								type: this.rightParam.type
							}
						}
						axios.PostAddDict(param).then(res => {
							if(res){
								this.dialogShow = false
								this.dialogShow3 = false
								this.dialogShow2 = false
								this.queryDict(param)
							}
						})
					}
				})
			},
			// 修改右侧内容
			dictModifyClick (index, data) {
				if (this.isSql == '1') {
					this.isSql1 = true
                    this.dialogShow3 = true
                    this.dialogCont3.id = data[index].id
                    this.dialogCont3.code = data[index].code
                    this.dialogCont3.name = data[index].name
                    this.dialogCont3.database = data[index].database
                    this.dialogCont3.sql = data[index].sql
                    this.dialogCont3.type = data[index].type
				} else {
					this.isSql1 = false
                    this.dialogShow2 = true
                    this.dialogCont2.id = data[index].id
                    this.dialogCont2.code = data[index].code
                    this.dialogCont2.name = data[index].name
                    this.dialogCont2.database = data[index].database
                    this.dialogCont2.sql = data[index].sql
                    this.dialogCont2.type = data[index].type
				}
				// this.dialogShow = true
				this.rightContentShow = true
				this.rightModifyShow = true
				this.addTitShow = false
				this.addTitShow = false
				this.rightAddShow = false
				this.modifyTitShow = false
				this.titName = '修改字典值'
			},
			// 确定修改右侧内容
			rightModifyClick (data, rulesName) {
				this.$refs[rulesName].validate((valid) => {
					if(valid){
						if(this.isSql1) {
							var param = {
								sql: data.sql,
								database: data.database,
								type: data.type,
								id: data.id
							}
						} else {
							var param = {
								code: data.code,
								name: data.name,
								type: data.type,
								id: data.id
							}
						}
						axios.PostModifyDict(param).then(res => {
							if(res){
								this.dialogShow = false
								this.dialogShow3 = false
								this.dialogShow2 = false
								this.queryDict(param)
							}
						})
					}
				})
			},
			// 右侧选中
			check(data) {
				console.log(data)
				this.arrRightContent = [];
				for(let item of data) {  
					this.arrRightContent.push(item.id)
				}
				var arr= this.arrRightContent
				for(var i = 0; i < arr.length-1; i++) {
					for (var j = i + 1; j < arr.length; j++) {
						if (arr[i] == arr[j]) {
							arr.splice(j, 1)
							j--
						}
					}
				}
			},
			// 删除右侧信息
			rightDelClick () {
				if (this.arrRightContent.length == 0) {
					this.$message({
						type: 'info',
						message: '请选择要删除的内容'
					})
					return false
				}
				this.$confirm('是否要删除内容?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					axios.PostDelDict (this.arrRightContent).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})			
						this.queryDict(this.rightParam)
					}).catch(() => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '删除失败'
					})
				})
			},
			// 删除左侧标题
			titDelClick (data) {
				this.$confirm('是否要删除该标题?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {type: data.type}
					axios.PostTypeDel (param).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.queryTit()
					}).catch(() => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '删除失败'
					})
				})
			}
    	}
	}
</script>

<style lang="scss">
.dic{
	.bgColor{background-color:aliceblue}
	em{font-style: normal;}
	.left-data{border: 1px solid #ddd;border-radius: 4px;min-height: 100px;
		span{display: block;padding: 10px;border-bottom: 1px solid #ddd;
			&:last-child{border-bottom: none;}
			.fa{float: right;}
		}
		em{display: inline-block;width: 108px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;}
	}
	.function-btn{margin-bottom: 10px;color: #0e7ef2;
		div{display: inline-block;}
		.del{margin-right: 10px;}
	}
	.fa{color: #0e7ef2;margin: 0 6px;font-size: 20px !important;vertical-align: middle;}
	.search{display: inline-block;color: #0e7ef2;}
	.pointer{cursor: pointer;}
	.el-dialog{width: 400px !important;}
	.el-dialogt{
		.el-dialog__header{background: #0183fe;padding-bottom: 10px;}
		.el-dialog__title,.el-icon-close {color: #fff !important;}
		.el-form-item{width: 360px;}
		.el-form-item__label{width: 94px !important;color: #000;font-weight: bold;}
		.el-form-item__content{margin-left: 68px !important;
			.el-select{width: 260px;}
			.el-input{width: 260px;}
		}
		.btn{text-align: right;margin: 0;}
		.el-button{padding: 10px 30px;}
	}
	.deltit-dialog{
		.el-dialog{
			.text{text-align: center;font-size: 18px;}
			.tit-btn{display: block;margin-left: 22%;
				.el-button--small{font-size: 14px;}
			}
		}

	}
}
</style>
