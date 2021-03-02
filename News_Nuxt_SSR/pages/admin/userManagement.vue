<template>
  <div>
    <el-row>
      <el-button
        style="float: right; width: 100px; line-height: 2"
        @click="openAdd"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="userID" label="会员编号" min-width="10%">
      </el-table-column>
      <el-table-column prop="userDate" label="添加时间" min-width="22%">
      </el-table-column>
      <el-table-column prop="userName" label="会员账号" min-width="20%"> </el-table-column>
      <el-table-column prop="userPassword" label="会员密码" min-width="28%"> </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button size="small" v-on:click="openUpd(scope.row.userID)"
            >编辑</el-button
          >
          <el-button size="small" v-on:click="dodel(scope.row.userID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div
      class="block"
      style="text-align: center; margin-top: 10px; margin-bottom: 100px"
    >
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total,prev,pager,next,jumper"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      :title="isUpd ? '编辑会员' : '添加会员'"
      :close-on-click-modal="false"
      :visible.sync="add_dialog"
      width="40%"
    >
      <el-form
        :model="user"
        :rules="rules"
        label-position="top"
        ref="user"
        label-width="80px"
      >
        <el-form-item label="会员账号" prop="userName">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>

        <el-form-item label="会员密码" prop="userPassword">
          <el-input v-model="user.userPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_dialog = false">取 消</el-button>
        <el-button v-if="!isUpd" type="primary" @click="dosubmit"
          >提 交</el-button
        >
        <el-button v-if="isUpd" type="primary" @click="dosubmitupd"
          >确认修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  layout: "default",
  data() {
    return {
      pagesize: 9, //设置每页显示条目个数为
      currentPage: 1, //设置当前页默认为1
      total: null, //分页前的数据
      totalnum: "",
      user: {
        userID: "",
        userDate: "",
        userName: "",
        userPassword: "",
      },
      tableData: [],
      add_dialog: false,
      dialogVisible: false,
      isUpd: false,
      rules: {
        userName: [
          { required: true, message: "请填写会员账号", trigger: "blur" },
          { min: 5, message: "长度至少 5 个字符", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请填写会员密码", trigger: "blur" },
          { min: 6, message: "长度至少 6 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/userManagement/userlist",
      })
        .then(function (response) {
          var res = response.data;
        //   console.log("res:", res);
          if (res.errno == 0) {
            _this.tableData = res.data;
            _this.total = res.data.totalnum;
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "网络请求错误",
            message: "请检查后端接口及跨域问题",
          });
        });
    },
    // 分页器
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },

    openAdd: function () {
      this.add_dialog = true;
      this.isUpd = false;
      this.user = {
        userID: "",
        userName: "",
        userPassword: "",
      };
    },

    openUpd: function (userID) {
      this.isUpd = true;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/userManagement/findbyuserID",
        method: "get",
        params: { userID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.user = res.data;
            _this.add_dialog = true; //打开对话框
          } else {
            _this.$notify.error({
              title: "失败",
              message: "无法获取数据",
            });
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "错误",
            message: "网络请求错误！",
          });
        });
    },

    // 查找ID
    handleClick(row) {
      console.log(row);
    },

    dosubmit: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/userManagement/addapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.user),
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.$notify({
              title: "成功",
              message: res.errmsg,
              type: "success",
            });
            _this.add_dialog = false; //关闭对话框
            _this.init(); // 添加成功后，重新调用查询数据接口
          } else {
            _this.$notify.error({
              title: "失败",
              message: res.errmsg,
            });
          }
        })
        .catch(function () {});
    },

    dosubmitupd: function () {
      var _this = this;
      // console.log("更新的内容：：",_this.news);
      axios({
        url: _this.$store.state.domain + "/admin/userManagement/updapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.user),
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.$notify({
              title: "成功",
              message: res.errmsg,
              type: "success",
            });
            _this.add_dialog = false; //关闭对话框
            _this.init(); // 添加成功后，重新调用查询数据接口
          } else {
            _this.$notify.error({
              title: "失败",
              message: res.errmsg,
            });
          }
        })
        .catch(function () {});
    },

    dodel: function (userID) {
      // alert(uuid);
      // return ;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/userManagement/dodel",
        method: "get",
        params: { userID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.$notify({
              title: "删除成功",
              message: res.msg,
              type: "success",
            });
            _this.init(); // 添加成功后，重新调用查询数据接口
          } else {
            _this.$notify.error({
              title: "删除失败",
              message: res.msg,
            });
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "错误",
            message: "网络请求错误！",
          });
        });
    },
  },

  created: function () {
    this.init();
  },
};
</script>

<style>
/* 去掉背景颜色 */
.el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
  /* box-shadow: 0 0 4px #06c; */
}

.el-table th,
.el-table tr {
  border: 0 !important;
  background-color: transparent !important;
}
/* 修改头部字体颜色 */
.el-table thead {
  color: rgba(46, 45, 45, 0.7) !important;
}
</style>