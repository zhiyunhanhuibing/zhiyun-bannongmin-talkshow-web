<template>
	<div class="user-manage">
		<el-form :inline="true" :model="formList" ref="formList">
			<el-form-item clearable prop="userName" label="用户名" v-model="formList.userName" class="username">
				<el-input placeholder="请输入用户名" v-model="formList.userName"></el-input>
			</el-form-item>
			<el-form-item label="微信号" v-model="formList.weixin">
				<el-input placeholder="请输入微信号" v-model="formList.weixin" clearable></el-input>
			</el-form-item>
			<el-form-item label="手机号" v-model="formList.tel">
				<el-input placeholder="请输入手机号" v-model="formList.tel" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否VIP" >
				<el-select placeholder="请选择" v-model="formList.vip">
					<el-option key="0" value="0" label="否"> </el-option>
					<el-option key="1" value="1" label="是"> </el-option>
				</el-select>
			</el-form-item>
			<br>
			<el-form-item label="创建时间">
				<el-date-picker v-model="formList.createTime" type="daterange" align="right"start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
			</el-form-item>
			<el-form-item class="search-btn">
				<el-button type="primary" @click="searchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData">
			<el-table-column prop="userName" label="用户名" width="150px"></el-table-column>
			<el-table-column prop="weixin" label="微信号" width="200px"></el-table-column>
			<el-table-column prop="tel" label="手机号" width="200px"></el-table-column>
			<el-table-column prop="vip" label="VIP等级" width="150px"></el-table-column>
			<el-table-column prop="vipLimitTime" :formatter="dateFormat" label="VIP到期时间" width="150px"></el-table-column>
			<el-table-column prop="balance" label="账户余额" width="150px"></el-table-column>
			<el-table-column prop="concessionBean" label="优惠积分" width="150px"></el-table-column>
			<el-table-column prop="createTime" :formatter="dateFormat" label="创建时间" width="150px"></el-table-column>
			<el-table-column prop="updateTime" :formatter="dateFormat" label="最后修改时间" width="150px"></el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[pageSize]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="totalPage">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import axios from "@/views/User/user"
import moment from "moment";
export default {
	data () {
		return {
			tableData: [],
			formList: {
				userName: '',
				weixin: '',
				tel: '',
				vip: '',
				createTime: ''
			},
			pageSize: 0,
			currentPage: 0,
      		totalPage: 0
		}
	},
	created () {
		this.getData()
	},
	methods: {
		dateFormat: function(row, column) {
			var data = row[column.property]
			if (data == undefined) {
				return ''
			}
			return moment(data).format("YYYY-MM-DD HH:mm:ss")
		},
		getData () {
			let params = {
				userName: this.formList.userName,
				weixin: this.formList.weixin,
				tel: this.formList.tel,
				vip: this.formList.vip,
				startCreateTime: this.formList.createTime[0] ? moment(this.formList.createTime[0]) .startOf('day') .valueOf() : 0,
				endCreateTime: this.formList.createTime[1] ? moment(this.formList.createTime[1]) .startOf('day') .valueOf() : 0,
				pageIndex: this.currentPage,
				pageRows: this.totalPage
			}
			axios.getUserInfo(params).then(data => {
				console.log(data.data)
				this.tableData = data.data.items
				this.pageSize = data.data.pageSize
				this.currentPage = data.data.currentPage
			})
		},
		// 点击搜索
		searchClick () {
			this.getData()
		},
		handleSizeChange(val) {
			console.log(val)
		},
		handleCurrentChange(val) {
			this.currentPage = val
		}
	}
}
</script>

<style lang="scss">
.user-manage{
	.el-form--inline {margin-top: 30px;}
	.username .el-input__inner{margin-left: 14px;}
	.el-form-item{margin-left: 20px;}
	.search-btn{margin-left:0;}
	.el-form-item__content {
		.el-input input{width: 140px;}
		.el-button--primary{margin-left: 20px;width: 94px;}
	}
	.el-date-editor--daterange input{width: 220px !important;}
	.el-table{
		.el-table__header{width: 100%;}
	}
	.el-table__header{width: 100% !important;}
}
</style>

