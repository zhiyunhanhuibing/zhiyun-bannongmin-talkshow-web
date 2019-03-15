<template>
  <div>
    <el-form :inline="true" :model="formList" :rules="rule" ref="formList">
      <el-form-item prop="orderId" label="订单号">
        <el-input placeholder="请输入订单号" v-model="formList.orderId"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="orderUserWeixin">
        <el-input placeholder="请输入微信号" v-model="formList.orderUserWeixin"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="orderUserTel">
        <el-input placeholder="请输入手机号" v-model="formList.orderUserTel"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-select v-model="formList.orderStatus " clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入订单状态" v-model="formList.orderStatus"></el-input> -->
      </el-form-item>
      <el-form-item label="订单提交时间" prop="orderTime">
        <el-date-picker
          v-model="formList.orderTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="订单结束时间" prop="orderEndTime">
        <el-date-picker
          v-model="formList.orderEndTime"
          type="daterange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <template>
      <el-table :data="tableData" class="table">
        <el-table-column prop="orderId" label="订单编码" width="150px"></el-table-column>
        <el-table-column prop="courierNumber" label="订单号" width="150px"></el-table-column>
        <el-table-column prop="orderUserWeixin" label="用户微信号" width="200px"></el-table-column>
        <el-table-column prop="orderUserTel" label="用户手机号" width="200px"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="200px"></el-table-column>
        <el-table-column prop="orderPrice" label="订单总价" width="150px"></el-table-column>
        <el-table-column prop="orderPrice" label="实收款" width="150px"></el-table-column>
        <el-table-column prop="orderTime" :formatter="dateFormat" label="订单提交时间" width="200px"></el-table-column>
        <el-table-column prop="courierNumber" label="快递号" width="200px"></el-table-column>
        <el-table-column prop="courierShop" label="物流公司" width="200px"></el-table-column>
        <el-table-column prop="orderEndTime" :formatter="dateFormat" label="订单结束时间" width="200px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" class="el-dialogt">
      <ordergood :orderId="orderId"></ordergood>
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
// import axios from "@/api/api";
import axios from "@/views/Ordermastertable/ordermastertable";
import ordergood from "./ordergoods.vue";
import moment from "moment";
export default {
  data() {
    return {
			value: "",
      dialogTableVisible: false,
      dialogVisible: false,
      currentPage: 1,
      totalPage: 0,
      tableData: [],
      orderId: "",
      formList: {
        orderId: "",
        orderUserWeixin: "",
        orderUserTel: "",
        orderTime: "",
        orderEndTime: "",
        orderStatus: ""
      },
      options: [
        {
          value: 1,
          label: "发起"
        },
        {
          value: 2,
          label: "退单"
        },
        {
          value: 3,
          label: "完成"
        }
      ],
      rule: {
        orderId: [
          {
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("内容不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        orderUserWeixin: [
          {
            // required: true,
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("内容不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        orderUserTel: [
          {
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("内容不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        orderStatus: [
          {
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("内容不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        orderTime: [
          {
            validator: (rule, value, callback) => {
              if (
                +this.formList.orderTime[0] > +this.formList.orderTime[1] &&
                +this.formList.orderTime[1] != 0
              ) {
                callback(new Error("结束时间不能早于开始时间"));
              } else if (value == "") {
                callback(new Error("内容不能为空"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        orderEndTime: [
          {
            validator: (rule, value, callback) => {
              if (
                +this.formList.orderEndTime[0] >
                  +this.formList.orderEndTime[1] &&
                +this.formList.orderEndTime[1] != 0
              ) {
                callback(new Error("结束时间不能早于开始时间"));
              } else if (value == "") {
                callback(new Error("内容不能为空"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    ordergood
  },
  methods: {
    dateFormat: function(row, column) {
      var data = row[column.property];
      if (data == undefined) {
        return "";
      }
      return moment(data).format("YYYY-MM-DD HH:mm:ss");
    },
    indexMethod(index) {
      return index * 2;
    },
    handleClick(row) {
      this.dialogTableVisible = true;
      this.orderId = row.orderId;
    },
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    // currentPageChange(page) {
    // 	this.page.currentPage = page;
    //   },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getList() {
      axios
        .getGood({
          params: {
            orderId: this.formList.orderId,
            orderUserWeixin: this.formList.orderUserWeixin,
            orderUserTel: this.formList.orderUserTel,
            orderStatus: this.formList.orderStatus,
            orderStartTime: this.formList.orderTime[0]
              ? moment(this.formList.orderTime[0]/1000)
                  .startOf("day")
                  .valueOf()
              : 0,
            orderEndTime: this.formList.orderTime[1]
              ? moment(this.formList.orderTime[1]/1000)
                  .startOf("day")
                  .valueOf()
              : 0,
            orderEndStartTime: this.formList.orderEndTime[0]
              ? moment(this.formList.orderEndTime[0]/1000)
                  .startOf("day")
                  .valueOf()
              : 0,
            orderEndEndTime: this.formList.orderEndTime[1]
              ? moment(this.formList.orderEndTime[0]/1000)
                  .startOf("day")
                  .valueOf()
              : 0,
            pageIndex: this.currentPage,
            pageRows: this.totalPage
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.items;
            this.currentPage = res.data.currentPage;
            this.totalPage = res.data.totalNum;
            // this.page.totalCount= res.data.currentPage;
            // console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {
      if (this.formList) {
        this.getList();
      } 
    }
  },
  created() {
    this.getList();
    console.log(this.orderId);
  }
};
</script>
<style>
.table {
  width: 100%;
  text-align: center;
  overflow-x: scroll;
}
.el-table .cell,
.el-table th > div {
  padding-left: 0;
  padding-right: 0;
}
.el-table td,
.el-table th > .cell {
  text-align: center;
}
.el-dialog--small {
  width: 70%;
}
.block {
  padding: 20px;
  float: right;
}
</style>