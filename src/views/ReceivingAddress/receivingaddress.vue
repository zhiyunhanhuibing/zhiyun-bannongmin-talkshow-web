<template>
    <div class="shoppingcart">
        <!--顶部搜索框-->
        <section class="Topsearch">
            <el-row >
                <el-col :span="7">
                    <el-form label-width="100px">
                        <el-form-item label="用户微信号">
                            <el-input placeholder="请输入搜索内容" v-model="searchcollectuserweixin"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="7">
                    <el-form label-width="100px">
                        <el-form-item label="用户手机号">
                            <el-input placeholder="请输入搜索内容" v-model="searchcollectusertel"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="7">
                    <el-form label-width="100px">
                        <el-form-item label="姓名">
                            <el-input placeholder="请输入搜索内容" v-model="searchnameen"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <el-form label-width="100px">
                        <el-form-item label="联系手机号">
                            <el-input placeholder="请输入搜索内容" v-model="searchtel"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="7">
                    <el-form label-width="100px">
                        <el-form-item label="性别">
                            <el-select v-model="searchgender" placeholder="请选择">
                                <el-option
                                        v-for="item in Gender"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="" style="text-align: right; margin-bottom: 10px; margin-right: 50px;">
                <!-- <el-button type="text">重置</el-button> -->
                <el-button type="primary">查询</el-button>
            </div>
        </section>
        <!--底部列表-->
        <section>
            <el-table :data="listData">
                <el-table-column prop="collectUserWeixin" label="用户微信号"></el-table-column>
                <el-table-column prop="collectUserTel" label="用户手机号"></el-table-column>
                <el-table-column prop="nameEn" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="tel" label="联系手机号"></el-table-column>
                <el-table-column prop="address" label="收获地址"></el-table-column>
                <el-table-column prop="detailedAddress" label="收获详细地址"></el-table-column>
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
    import axios from '@/views/ReceivingAddress/receivingAddress'
    export default {
        data () {
            return {
                // 搜索框联系手机号
                searchtel: '',
                // 搜索框姓名
                searchnameen: '',
                // 搜索框用户手机号
                searchcollectusertel: '',
                // 搜索框用户微信号
                searchcollectuserweixin: '',
                // 下拉框选中的性别
                searchgender: '',
                // 下拉框中的data
                Gender: [
                    {
                        label: '男',
                        value: '1'
                    },
                    {
                        label: '女',
                        value: '0'
                    }
                ],
                // 分页
                currentPage4:4,
                // 购物车data
                listData: []
            }
        },
        created () {
          // this.getList();
          this.queryHarvest()
        },
        methods: {
            // 查询收获地址接口
            queryHarvest () {
                let prams = {}
                axios.PostHarvestaddress (prams) .then(res => {
//                    console.log(res)
                    this.listData = res.data.items
                })
            },

            // 分页
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`);
            }
        }
    
  
  // created() {
  //   this.getList();
  // }
};
</script>
<style scoped>
    .Topsearch{
        margin-top: 10px;
    }
</style>
<style lang="scss">
    .shoppingcart .el-col{
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
</style>