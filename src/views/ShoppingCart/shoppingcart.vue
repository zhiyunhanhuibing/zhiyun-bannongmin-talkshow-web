<template>
    <div class="shoppingcart">
        <!--顶部搜索框-->
        <section class="Topsearch">
            <el-row>
                <el-col :span="8">
                    <el-form label-width="100px">
                        <el-form-item label="用户微信号">
                            <el-input placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="8">
                    <el-form label-width="100px">
                        <el-form-item label="用户手机号">
                            <el-input placeholder="请输入搜索内容"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="" style="text-align: right; margin-bottom: 10px; margin-right: 50px;">
                <el-button type="text">重置</el-button>
                <el-button type="primary">查询</el-button>
            </div>
        </section>
        <!--底部列表-->
        <section>
            <el-table :data="listData">
                <el-table-column prop="cartuserweixin" label="用户微信号"></el-table-column>
                <el-table-column prop="cartusertel" label="用户手机号"></el-table-column>
                <el-table-column prop="goodsid" label="商品编号"></el-table-column>
                <el-table-column prop="goodsnumber" label="商品数量"></el-table-column>
                <el-table-column prop="goodsname" label="商品名称"></el-table-column>
            </el-table>
        </section>
        <!--分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import axios from '@/views/CommodityType/CommodityType'
    export default {
        data () {
            return {
                // 分页
                currentPage4:4,
                // 购物车data
                listData: [
                    {
                        cartuserweixin: '12312321312312',
                        cartusertel: '12312312312313',
                        goodsid: '12321',
                        goodsnumber: '12313',
                        goodsname: '商品名称'
                    }
                ]
            }
        },
        created () {

        },
        methods: {
            // 分页
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
<style scoped>
    .Topsearch{
        margin-top: 10px;
    }
</style>