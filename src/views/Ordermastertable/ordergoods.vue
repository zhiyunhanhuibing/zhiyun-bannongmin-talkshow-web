<template>
  <div>
    <el-form :inline="true" v-model="formList" :rules="rules" ref="formList">
      <el-form-item prop="name">
        <el-input placeholder="请输入搜索内容" v-model="itemList.goodId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <template>
      <el-table :data="formList" class="table">
        <el-table-column prop="crderId" label="订单编号" width="130px"></el-table-column>
        <el-table-column prop="goodsId" label="商品编号" width="150px"></el-table-column>
        <el-table-column prop="goodsNumber" label="商品数量" width="150px"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品单价" width="150px"></el-table-column>
        <el-table-column prop="goodsTotal" label="商品总价" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" width="150px"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200px"></el-table-column>
        <el-table-column prop="updateTime" label="最后创建时间" width="200px"></el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import axios from "@/api/api";
import axios from "@/views/Ordermastertable/ordergoods";
export default {
  data() {
    return {
      dialogVisible: false,
      formList: [],
      itemList: {
        goodId: ""
      },
      currentPage: 1,
      totalPage: 0,
      rules: {
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
              if (value == "") {
                callback(new Error("内容不能为空"));
              } else if (!reg.test(value)) {
                callback(new Error("仅可输入数字"));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  props: ["orderId"],
  methods: {
    indexMethod(index) {
      return index * 2;
    },
    handleClick(row) {
      console.log(row);
    },

    getMist() {
      axios
        .getTable({
          orderId: this.orderId,
          goodId: this.itemList.goodId,
          pageIndex: this.currentPage,
          pageRows: this.totalPage
        })
        .then(res => {
          console.log(res);
          this.formList = res.data.items;
          this.currentPage = res.data.currentPage;
          this.totalPage = res.data.totalPage;
          console.log(this.formList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    search() {
      var that = this;
      this.$refs["formList"].validate(valid => {
        if (!valid) {
          return;
        } else {
          this.getList();
        }
      });
    }
  },
  created() {
    this.getMist();
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
</style>