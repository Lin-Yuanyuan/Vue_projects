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
      <el-table-column prop="actionID" label="点赞编号" min-width="10%">
      </el-table-column>
      <el-table-column prop="actionDate" label="点赞时间" min-width="22%">
      </el-table-column>
      <el-table-column prop="actionnewsID" label="新闻编号" min-width="20%">
      </el-table-column>
      <el-table-column prop="actionuserID" label="会员编号" min-width="28%">
      </el-table-column>
      <el-table-column prop="actionuserName" label="会员账号" min-width="28%">
      </el-table-column>
      <el-table-column prop="actionCount" label="点赞记录" min-width="28%">
      </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button size="small" v-on:click="openUpd(scope.row.actionID)"
            >编辑</el-button
          >
          <el-button size="small" v-on:click="dodel(scope.row.actionID)"
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
      :title="isUpd ? '编辑点赞' : '添加点赞'"
      :close-on-click-modal="false"
      :visible.sync="add_dialog"
      width="40%"
    >
      <el-form
        :model="action"
        :rules="rules"
        label-position="top"
        ref="action"
        label-width="80px"
      >
        <el-form-item label="点赞新闻编号" prop="actionnewsID">
          <el-input v-model="action.actionnewsID"></el-input>
        </el-form-item>

        <el-form-item label="会员编号" prop="actionuserID">
          <el-input v-model="action.actionuserID"></el-input>
        </el-form-item>

        <el-form-item label="会员账号" prop="actionuserName">
          <el-input v-model="action.actionuserName"></el-input>
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
      action: {
        actionnewsID: "",
        actionuserID: "",
        actionuserName: "",
      },
      tableData: [],
      add_dialog: false,
      dialogVisible: false,
      isUpd: false,
      rules: {
        actionnewsID: [
          { required: true, message: "请填写点赞的新闻编号", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        actionuserID: [
          { required: true, message: "请填写点赞的会员编号", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        actionuserName: [
          { required: true, message: "请填写点赞的会员账号", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/actionManagement/actlist",
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
      this.action = {
        actionnewsID: "",
        actionuserID: "",
        actionuserName: "",
      };
    },

    openUpd: function (actionID) {
      this.isUpd = true;
      var _this = this;
      axios({
        url:
          _this.$store.state.domain + "/admin/actionManagement/findbyactionID",
        method: "get",
        params: { actionID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.action = res.data;
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
        url: _this.$store.state.domain + "/admin/actionManagement/addapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.action),
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
        url: _this.$store.state.domain + "/admin/actionManagement/updapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.action),
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

    dodel: function (actionID) {
      // alert(uuid);
      // return ;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/actionManagement/dodel",
        method: "get",
        params: { actionID },
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