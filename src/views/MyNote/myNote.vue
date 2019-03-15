<template>					
    <div>  
    <div style="float: right;">
    
     <el-button type="primary" class="fa fa-paint-brush" aria-hidden="true" @click="toWriteNote">
         写笔记
          </el-button>
     </div>
        <el-table
        :data="list"
        class="table"
        :default-sort = "{prop: 'data',prder: 'descending'}">
            <el-table-column min-width="45%"
            prop="article_title"
            label="笔记名称">
            </el-table-column>
            <el-table-column min-width="15%"
            prop="createtime"
            label="创建日期"
            :formatter="dateFormat"
            sortable>
            </el-table-column>
            <el-table-column min-width="15%"
            prop="updatetime"
            label="更新时间"
            :formatter="dateFormat"
            sortable>
            </el-table-column>
            <el-table-column
            fixed="right"
            min-width="10%"
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="delect(scope.$index, list)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
       
        <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
    </div>
</template>
<script>
import axios from '@/views/MyNote/myNote';
import moment from "moment";
export default {
    data () {
        return {
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
            list:[],
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
                this.list=res.data.items;
                this.id = res.items.id;
                this.currentPage = res.data.currentPage;
                this.totalPage = res.data.totalNum;
                console.log(this.list);
            }).catch((err) => {
                console.log(err);
            })
        },

        	//跳转至写笔记
			toWriteNote: function () {
				var _this = this;
				_this.$router.push('/writeNote');
			},
    },
};
</script>
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<style >
.el-dialog--small {
  width: 50%;
}

</style>
