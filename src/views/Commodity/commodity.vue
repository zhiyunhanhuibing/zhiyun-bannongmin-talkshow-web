<template>
	<div class="content Commodity">
        <el-row :gutter="20">
            <!--商品管理左侧-->
            <el-col :span="7">
                <div class="LeftManagement">
                    <!--左侧增加，查询按钮-->
                    <!--<div class="text-right">-->
                        <!--<el-button type="text"><i class="el-icon-plus"></i>增加</el-button>-->
                        <!--<el-button type="text" @click="LeftQuery"><i class="el-icon-caret-bottom" v-show="LeftQueryIcon"></i><i class="el-icon-caret-top" v-show="!LeftQueryIcon"></i>查询</el-button>-->
                    <!--</div>-->
                    <!--树控件-->
                    <el-tree :props="{label: 'name'}" ref="tree" :data="CommodityData" @node-click="handleCheckChange" node-key='index' default-keys='0'>
                    </el-tree>
                </div>
            </el-col>
            <!--商品管理右侧-->
            <el-col :span="17">
                <div class="RightManagement">
                    <!--右侧增加查询按钮-->
                    <div class="text-right">
                        <el-button type="text" @click="Add('increase')"><i class="el-icon-plus"></i>增加</el-button>
                        <!-- <el-button type="text" @click="RightQuery"><i class="el-icon-caret-bottom" v-show="RightQueryIcon"></i><i class="el-icon-caret-top" v-show="!RightQueryIcon"></i>查询</el-button> -->
                    </div>
                    <!-- 查询内容 -->
                    <section>
                        <el-form v-model='Query'>
                            <el-row>
                                <el-col :span='8'>
                                    <el-form-item label='商品类型' label-width='80px'>
                                        <el-input v-model='Query.type' :disabled='true'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='8'>
                                    <el-form-item label='商品编号' label-width='80px'>
                                        <el-input v-model='Query.goodsId'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='8'>
                                    <el-form-item label='商品名称' label-width='80px'>
                                        <el-input v-model='Query.goodsName'></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span='5'>
                                    <el-form-item label='售价' label-width='80px'>
                                        <el-input style="width:85%;" v-model='Query.originalStartPrice'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='3'>
                                    <el-form-item label-width='15px'>
                                        <span slot='label' style="margin-left:-15px;">一</span>
                                        <el-input v-model='Query.originalEndPrice'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='5'>
                                    <el-form-item label='促销价' label-width='80px'>
                                        <el-input style="width:85%;" v-model='Query.promotionStartPrice'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='3'>
                                    <el-form-item label-width='15px'>
                                        <span slot='label' style="margin-left:-15px;">一</span>
                                        <el-input v-model='Query.promotionEndPrice'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='5'>
                                    <el-form-item label='会员价' label-width='80px'>
                                        <el-input style="width:85%;" v-model='Query.vipStartPrice'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='3'>
                                    <el-form-item label-width='15px'>
                                        <span slot='label' style="margin-left:-13px;">一</span>
                                        <el-input v-model='Query.vipEndPrice'></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span='5'>
                                    <el-form-item label='时间范围' label-width='80px'>
                                            <el-date-picker
                                            v-model="Query.qualityStartDate"
                                            type="date"
                                            placeholder="选择日期" style="width:85%">
                                          </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='3'>
                                        <el-form-item label-width='15px'>
                                            <span slot='label' style="margin-left:-15px;">一</span>
                                            <el-date-picker
                                            v-model="Query.qualityEndDate"
                                            type="date"
                                            placeholder="选择日期" style="width:96%">
                                          </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                <el-col :span='8'>
                                    <el-form-item label='品牌' label-width='80px'>
                                            <el-select v-model="Query.brand" clearable placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='8'>
                                    <el-form-item label='长度' label-width='80px'>
                                            <el-select v-model="Query.unit" clearable placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div style="text-align:right; margin-bottom:10px;">
                            <el-button type='primary' @click="Resetfri">重置</el-button>
                            <el-button type='primary' @click="Queryfri">查询</el-button>
                        </div>
                    </section>
                    <!--列表内容-->
                    <section class="list">
                        <el-table :data="tabledata">
                            <el-table-column prop="type" label="商品类型" width='100'></el-table-column>
                            <el-table-column prop="goodsId" label="商品编号" width='300'></el-table-column>
                            <el-table-column prop="goodsName" label="商品名称" width='200'></el-table-column>
                            <el-table-column prop="originalPrice" label="售价" width='60'></el-table-column>
                            <el-table-column prop="promotionPrice" label="促销价" width='60'></el-table-column>
                            <el-table-column prop="vipPrice" label="会员价" width='60'></el-table-column>
                            <el-table-column prop="smallImage" label="小图" width='700'></el-table-column>
                            <el-table-column prop="largeImage" label="大图" width='700'></el-table-column>
                            <el-table-column prop="sellCount" label="销售量" width='60'></el-table-column>
                            <el-table-column prop="surplusCount" label="剩余数量" width='60'></el-table-column>
                            <el-table-column prop="sketch" label="简述" width='200'></el-table-column>
                            <el-table-column prop="qualityDate" :formatter="dateFormat" label="保质期" width='150'></el-table-column>
                            <el-table-column prop="place" label="产地" width='100'></el-table-column>
                            <el-table-column prop="goodsWeight" label="商品重量" width='100'></el-table-column>
                            <el-table-column prop="unit" label="单位" width='100'></el-table-column>
                            <el-table-column prop="brand" label="品牌" width='100'></el-table-column>
                            <el-table-column prop="length" label="长度" width='100'></el-table-column>
                            <el-table-column prop="width" label="宽度" width='100'></el-table-column>
                            <el-table-column prop="height" label="高度" width='100'></el-table-column>
                            <el-table-column prop="upc" label="UPC码" width='100'></el-table-column>
                            <el-table-column prop="describe" label="描述" width='200'></el-table-column>
                            <el-table-column label="操作" fixed="right"> 
                                <template slot-scope="scope">
                                    <el-button type="text" @click='Modifyoperation(scope.row)'>修改</el-button>
                                    <el-button type="text" @click='Deleteoperation(scope.row)'>删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </section>
                    <!-- 分页 -->
                    <div class="block">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="totalPage">
                        </el-pagination>
                    </div>
                    
                </div>
            </el-col>
        </el-row>
        <!-- 增加弹出框 -->
        <el-dialog :visible.sync="Addpopupbox">
            <span slot='title' class="Increasetitle">{{addTitle}}</span>
            <el-form :model='increase' label-width="80px" :rules='rules' ref='increase'>
                <el-form-item label="类型">
                    <el-input v-model='typeTop' :disabled='true'></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsName">
                    <el-input v-model='increase.goodsName'></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                    <el-input v-model='increase.goodsId'></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model='increase.goodsWeight'></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model='increase.brand'></el-input>
                </el-form-item>
                <el-form-item label="大图" prop='largeImage'>
                    <el-upload
                        class="Fileupload"
                        action="/plat/file/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="increase.largeImage" :src="increase.largeImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="小图" prop='smallImage'>
                    <el-upload
                        class="Fileupload"
                        action="/plat/file/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2">
                        <img v-if="increase.smallImage" :src="increase.smallImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="高度">
                    <el-input v-model='increase.height'></el-input>
                </el-form-item>
                <el-form-item label="长度">
                    <el-input v-model='increase.length'></el-input>
                </el-form-item>
                <el-form-item label="宽度">
                    <el-input v-model='increase.width'></el-input>
                </el-form-item>
                <el-form-item label="售价" prop='originalPrice'>
                    <el-input v-model='increase.originalPrice'></el-input>
                </el-form-item>
                <el-form-item label="促销价">
                    <el-input v-model='increase.promotionPrice'></el-input>
                </el-form-item>
                <el-form-item label="会员价">
                    <el-input v-model='increase.vipPrice'></el-input>
                </el-form-item>
                <el-form-item label="产地">
                    <el-input v-model='increase.place'></el-input>
                </el-form-item>
                <el-form-item label="销售量">
                    <el-input v-model='increase.sellCount'></el-input>
                </el-form-item>
                <el-form-item label="剩余数量">
                    <el-input v-model='increase.surplusCount'></el-input>
                </el-form-item>
                <el-form-item label="简述">
                    <el-input v-model='increase.sketch'></el-input>
                </el-form-item>
                <el-form-item label="保质期" prop='qualityDate'>
                    <!-- <el-input v-model='increase.qualityDate'></el-input> -->
                    <el-date-picker
                        v-model="increase.qualityDate"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model='increase.unit'></el-input>
                </el-form-item>
                <el-form-item label="UPC码">
                    <el-input v-model='increase.upc'></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model='increase.describe'></el-input>
                </el-form-item>
                <el-form-item label="是否上架" prop='upperLowerShelf'>
                    <el-radio v-model="increase.upperLowerShelf" label="0">上架</el-radio>
                    <el-radio v-model="increase.upperLowerShelf" label="1">下架</el-radio>
                </el-form-item>
            </el-form>
            <div slot='footer'>
                <el-button type='primary'>取消</el-button>
                <el-button type='primary' @click="addDetermine('increase')">确定</el-button>
            </div>
        </el-dialog>  
	</div>
</template>

<script>
    import axios from '@/views/Commodity/commodity'
    import moment from 'moment';
    export default {
		data(){
            return{
                options: [
                    {
                        value:'0',
                        label:'0'
                    }
                ],
                // 查询内容
                Query: {},
                // 分页
                pageSize: 0,
                totalPage: 0,
                currentPage: 0,
                // 点击获取到的code值
                codeTop: '',
                // 校验增加弹出框
                rules:{
                    goodsName: [
                        {required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    largeImage: [
                        {required: true, message: '请选择大图', trigger: 'blur' }
                    ],
                    smallImage: [
                        {required: true, message: '请选择小图', trigger: 'blur' }
                    ],
                    originalPrice: [
                        {required: true, message: '请输入售价'}
                    ],
                    qualityDate: [
                        {required: true, message: '请输入保质期'}
                    ],
                    upperLowerShelf: [
                        {required: true, message: '请选择是否上架', trigger: 'blur' }
                    ],
                },
                // 增加弹出框中的类型
                typeTop: '',
                // 增加弹窗输入的值
                increase: {
                    // 文件上传成功后的返回的大图地址
                    largeImage: '',
                    // 文件上传成功后的返回的小图地址
                    smallImage: '',
                },
                // 弹出框的标题
                addTitle: '',
                // 判断显示增加弹出框
                Addpopupbox: false,
                // 左边查询图标向上向下，true向上，false向下
                LeftQueryIcon: true,
                // 右边查询图标向上向下，true向上，false向下
                RightQueryIcon: true,
                // 右侧列表data
                tabledata : [],
                // 左侧商品类型管理data
                CommodityData: []
			}
		},
        created() {
            this.CommodityType()
        },
        methods: {
            // 重置按钮事件
            Resetfri () {
                if (this.codeTop) {
                    this.Query={
                        type: this.codeTop
                    }
                    let prams={type: this.Query.type};
                    this.RightSideData(prams)
                }else{
                    this.$message.error('请选择商品类型');
                }
                
            },
            // 查询按钮事件
            Queryfri () {
                if (this.codeTop) {
                    let prams=this.Query;
                    this.RightSideData(prams)
                }else{
                    this.$message.error('请选择商品类型');
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            // 获取右侧数据
            RightSideData (prams) {
                axios.QuerySingledata(prams).then(res => {
                    this.tabledata = res.data.items
                    this.Query.type = this.codeTop
                    this.currentPage = res.data.currentPage
                    this.totalPage = res.data.totalNum
                    this.pageSize = res.data.pageSize
                })
            },
            // 删除按钮点击事件
            Deleteoperation (data) {
                let prams={type:data.type, goodsId:data.goodsId}
                console.log(prams)
                axios.DeleteMerchandise (prams) .then(res =>{
                    this.$message({
                        message: res.data.statusMessage,
                        type: 'success'
                    });
                    let prams1={type: data.type}
                    this.RightSideData(prams1)
                })
            },
            // 修改按钮点击事件
            Modifyoperation (data) {
                this.increase = data
                this.addTitle = '修改'
                this.Addpopupbox = true
                console.log(this.addTitle)
            },
            // 转换获取时间
            dateFormat:function(row,column) {
                var data = row[column.property];
                if(data ==undefined) {
                    return '';
                }
                return moment(data).format("YYYY-MM-DD")
            },
            // 增加弹窗确定事件
            addDetermine (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.increase.qualityDate){
                            this.increase.qualityDate = moment(this.increase.qualityDate/1000).valueOf()
                        }
                        this.increase.type=this.codeTop
                        let prams=this.increase
                        if (this.addTitle == '增加') {
                            axios.AddMerchandise (prams) .then(res => {
                                this.$message({
                                    message: res.data.statusMessage,
                                    type: 'success'
                                });
                                this.Addpopupbox = false
                                let prams1={type: this.codeTop}
                                this.RightSideData(prams1)
                            })
                        }else{
                            axios.ModifyMerchandise (prams) .then(res => {
                                this.$message({
                                    message: res.data.statusMessage,
                                    type: 'success'
                                });
                                this.Addpopupbox = false
                                let prams1={type: this.codeTop}
                                this.RightSideData(prams1)
                            })
                        }
                    }
                })
            },
            // 上传图片成功时候的事件
            handleAvatarSuccess2 (file) {
                this.imagefile = file;
                console.log(this.imagefile)
                this.increase.smallImage = this.imagefile.filePath;
                this.$message({
                    message: this.imagefile.statusMessage,
                    type: 'success'
                });
            },
            // 上传图片成功时候的事件
            handleAvatarSuccess (file) {
                this.imagefile = file;
                this.increase.largeImage = this.imagefile.filePath;
                this.$message({
                    message: this.imagefile.statusMessage,
                    type: 'success'
                });
            },
            // 增加按钮事件
            Add (formName) {
                if (this.typeTop) {
                    this.Addpopupbox = true
                    this.addTitle = '增加'
                    this.increase = {upperLowerShelf: '0'}// 点击右侧增加清空弹窗内容
                    this.$refs[formName].resetFields();
                }else {
                    this.$message.error('请选择商品类型');
                }
            },

		    // 左侧商品类型管理data
            CommodityType () {
                axios.PostCommoditytype().then(data => {
                    this.CommodityData=data.data
                })
                
            },

            // 右侧查询按钮点击操作
            RightQuery () {
                this.RightQueryIcon=!this.RightQueryIcon
            },
		    // 左侧查询按钮点击操作
            LeftQuery () {
                this.LeftQueryIcon=!this.LeftQueryIcon
            },
		    // 点击树控件的事件
            handleCheckChange (data) {
                if (!data.children) {
                    this.typeTop=data.name
                    this.codeTop = data.code
                    let prams={type: data.code}
                    this.RightSideData(prams)
                }
            }
        }
    }

</script>

<style scoped>
    .Commodity {
        min-width: 1300px;
    }
    .Increasetitle{
        font-size:24px;
        margin-left: 50%;
    }
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
<style>
    .Commodity .is-current{
        background: #d1dbe5;
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
</style>