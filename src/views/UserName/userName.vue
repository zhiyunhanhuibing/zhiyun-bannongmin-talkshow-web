<template>
    <div>
        <div>
            <el-button type="primary" style="margin:20px 0;" @click="add()">添加用户</el-button>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
            <el-form :model="formDate" :label-position="labelPosition" label-width="100px" :rules="rule" ref="formDate">
                <el-form-item label="用户:" prop="userName">
                    <el-input v-model="formDate.userName" style="width:300px"></el-input>
                </el-form-item>
                 <el-form-item label="用户密码:" prop="password">
                    <el-input v-model="formDate.password" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="收货地址:" prop="address">
                <el-input v-model="formDate.address" autocomplete="off" style="width:300px;"></el-input>
                </el-form-item>
                <!-- <el-form-item label="创建日期:" >
                    <el-date-picker
                    v-model="formDate.createTime"
                    type="datetime"
                    placeholder="请选择日期">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item label="到期日期:">
                     <el-date-picker 
                    v-model="formDate.limitTime"
                    type="datetime"
                    placeholder="请选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="电话:" prop="tel">
                <el-input v-model="formDate.tel" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="微信:" prop="weixin">
                <el-input v-model="formDate.weixin" style="width:300px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.prevent="yes()">确 定</el-button>
            </div>
            </el-dialog>
        </div>
        <div>
            <el-form :inline="true" ref="form" v-model="form">
                <el-form-item label="手机号:">
                    <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="微信:">
                    <el-input v-model="form.weixin" placeholder="请输入微信号"></el-input>
                </el-form-item>
                <el-form-item label="活动到期日期:">
                    <el-date-picker
                    v-model="form.startLimitTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
        :data="list"
        class="table"
        :default-sort = "{prop: 'data',prder: 'descending'}">
            <el-table-column width="200px"
            prop="address"
            label="收货地址">
            </el-table-column>
            <el-table-column width="200px"
            prop="createTime"
            label="创建日期"
            :formatter="dateFormat"
            sortable>
            </el-table-column>
            <el-table-column width="200px"
            prop="limitTime"
            label="到期日期"
            :formatter="dateFormat"
            sortable>
            </el-table-column>
            <el-table-column width="200px"
            prop="tel"
            label="电话">
            </el-table-column>
            <el-table-column width="200px"
            prop="updateTime"
            label="更新时间"
            :formatter="dateFormat"
            sortable>
            </el-table-column>
            <el-table-column width="200px"
            prop="userName"
            label="用户名称">
            </el-table-column>
            <el-table-column width="200px"
            prop="weixin"
            label="用户微信">
            </el-table-column>
            <el-table-column
            fixed="right"
            width="150px"
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="mondify(scope.$index, list)">修改</el-button>
                <el-button type="text" size="small" @click.native.prevent="delect(scope.$index, list)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible1" >
        <el-form :model="datalist" :label-position="labelPosition" label-width="100px" :rules="rule" ref="datalist" >
            <el-form-item label="用户:" prop="userName">
                <el-input v-model="datalist.userName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="用户密码:" prop="password">
                <el-input v-model="datalist.password" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="收货地址:" prop="address">
            <el-input v-model="datalist.address" autocomplete="off" style="width:250px;"></el-input>
            </el-form-item>
            </el-form-item>
            <el-form-item label="到期日期:">
                <el-date-picker 
                v-model="datalist.limitTime"
                type="datetime"
                placeholder="请选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="电话:" prop="tel">
            <el-input v-model="datalist.tel" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="微信:" prop="weixin">
            <el-input v-model="datalist.weixin" style="width:300px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click.prevent="yesone()">确 定</el-button>
        </div>
        </el-dialog>
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
import axios from '@/views/UserName/userName';
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
            totalPage: 0,
            rule:{
                userName:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入您的密码', trigger: 'blur' },                      
                ],
                address:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                tel:[
                    { required: true, message: '请输入电话号码', trigger: 'blur' },  
                ],
                weixin:[
                    { required: true, message: '请输入您的微信', trigger: 'blur' },                      
                ]
            }
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
        add() {
            this.dialogFormVisible = true
        },
        yes() {
            this.$refs['formDate'].validate((valid) => {
                if(valid){
                    let saveParam = Object.assign({}, this.formDate);
                    saveParam.userName=this.formDate.userName,
                    saveParam.address=this.formDate.address,
                    saveParam.tel=this.formDate.tel,
                    saveParam.weixin=this.formDate.weixin,
                    saveParam.password=this.formDate.password,
                    saveParam.pageIndex=this.currentPage,
                    saveParam.pageRows= this.totalPage,
                    saveParam.limitTime=String(this.formDate.limitTime
                    ? moment(this.formDate.limitTime/1000)
                    .startOf("day")
                    .valueOf()
                    : 0),
                    axios.systemAdd(
                        saveParam
                    ).then((res) => {
                        this.currentPage = res.data.currentPage;
                        this.totalPage = res.data.totalNum;
                        this.search();
                    }).catch((err) =>{
                        console.log(err);
                    })
                    this.dialogFormVisible = false;
                 }else {
                     console.log('验证失败');
                 } 
            })
        },
        yesone() {
            this.$refs['datalist'].validate((valid) => {
                if(valid){
                    // let saveparam = Object.assign({}, this.datalist);
                    let saveparam={}
                    saveparam.id=this.datalist.id,
                    console.log(this.datalist.id),
                    saveparam.userName=this.datalist.userName,
                    saveparam.address=this.datalist.address,
                    saveparam.tel=this.datalist.tel,
                    saveparam.weixin=this.datalist.weixin,
                    saveparam.password=this.datalist.password,
                    saveparam.limitTime=String(this.datalist.limitTime
                    ? moment(this.datalist.limitTime/1000)
                    .startOf("day")
                    .valueOf()
                    : 0),
                     axios.systemModify(
                         saveparam  
                    ).then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    })
                    this.dialogFormVisible1 = false
                 }else {
                     console.log('验证失败');
                 } 
            })
           
        },
        //搜素
        search() {
            let postSearch = Object.assign({},this.form);
            postSearch.tel = this.form.tel;
            postSearch.weixin = this.form.weixin;
            postSearch.startLimitTime = String(this.form.startLimitTime[0]?moment(this.form.startLimitTime[0]/1000).startOf('day').valueOf():0);
            postSearch.endLimitTime = String(this.form.startLimitTime[1]?moment(this.form.startLimitTime[1]/1000).startOf('day').valueOf():0);
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
        //修改
        mondify(index,row) {
            let that =this;
            that.datalist = row[index];
            console.log(that.datalist);
            this.dialogFormVisible1 = true
        },
        //删除
        delect(index,row) {
            var paramids = [];
            paramids.push(row[index].id);
            console.log(row[index].id);
            axios.systemDel(
                paramids,
            ).then((res) => {
                console.log(res);
                console.log(id);
            }).catch((err) => {
                console.log(err);
            })
        }
    },
};
</script>
<style >
.el-dialog--small {
  width: 50%;
}
</style>
