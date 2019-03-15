<template>
    <div class="content">
        <el-row :gutter="20">
            <!--商品管理左侧-->
            <el-col :span="4">
                <div class="LeftManagement">
                    <!--左侧增加，查询按钮-->
                    <!--<div class="text-right">-->
                    <!--<el-button type="text"><i class="el-icon-plus"></i>增加</el-button>-->
                    <!--<el-button type="text" @click="LeftQuery"><i class="el-icon-caret-bottom" v-show="LeftQueryIcon"></i><i class="el-icon-caret-top" v-show="!LeftQueryIcon"></i>查询</el-button>-->
                    <!--</div>-->
                    <!--树控件-->
                    <el-tree ref="tree" show-checkbox  node-key="id" :data="CommodityData" @check-change="handleCheckChange">
                    </el-tree>
                </div>
            </el-col>
            <!--商品管理右侧-->
            <el-col :span="20">
                <div class="RightManagement">
                    <!--右侧增加查询按钮-->
                    <div class="text-right">
                        <el-button type="text"><i class="el-icon-plus"></i>增加</el-button>
                        <el-button type="text" @click="RightQuery"><i class="el-icon-caret-bottom" v-show="RightQueryIcon"></i><i class="el-icon-caret-top" v-show="!RightQueryIcon"></i>查询</el-button>
                    </div>
                    <!--列表内容-->
                    <section class="list">
                        <el-table :data="tabledata">
                            <el-table-column prop="data" label="日期"></el-table-column>
                            <el-table-column prop="name" label="商品名"></el-table-column>
                            <el-table-column prop="province" label="所属区域"></el-table-column>
                            <el-table-column prop="city" label="所属地区"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text">编辑</el-button>
                                    <el-button type="text">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </section>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                //左边查询图标向上向下，true向上，false向下
                LeftQueryIcon: true,
                //右边查询图标向上向下，true向上，false向下
                RightQueryIcon: true,
                tabledata : [],
                CommodityData: [
                    {
                        label: '一级',
                        children: [{
                            label: '二级'
                        },{
                            label: '二级1'
                        },{
                            label: '二级2'
                        },{
                            label: '二级3'
                        }]
                    },
                    {
                        label: '一级',
                        children: [{
                            label: '二级'
                        }]
                    },
                    {
                        label: '一级',
                        children: [{
                            label: '二级'
                        }]
                    }
                ]
            }
        },
        created() {
//            axios.getTwo().then(data => {
//                this.tabledata=data.data.data
//            })
        },
        methods: {

            // 右侧查询按钮点击操作
            RightQuery () {
                this.RightQueryIcon=!this.RightQueryIcon
            },
            // 左侧查询按钮点击操作
            LeftQuery () {
                this.LeftQueryIcon=!this.LeftQueryIcon
            },
            // 点击树控件的事件
            handleCheckChange (data, checked, indeterminate) {
                console.log(data)
//                if (!data.children) {
//                    console.log(data);
//                }
            }
        }
    }

</script>

<style scoped>
    .LeftManagement{
        margin-top: 34px;
        border:1px solid #cccccc;
        min-height: 800px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
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