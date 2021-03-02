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
      <el-table-column prop="commentID" label="评论编号" min-width="7%">
      </el-table-column>
      <el-table-column prop="commentDate" label="评论时间" min-width="14%">
      </el-table-column>
      <el-table-column prop="commentNewsID" label="新闻编号" min-width="7%">
      </el-table-column>
      <el-table-column prop="commentUserID" label="会员编号" min-width="10%">
      </el-table-column>
      <el-table-column prop="commentUserName" label="会员账号" min-width="12%">
      </el-table-column>
      <el-table-column prop="commentNewsTitle" label="新闻标题" min-width="17%">
        <template slot-scope="scope">
          {{ scope.row.commentNewsTitle | ellipsis }}
        </template>
      </el-table-column>

      <el-table-column prop="commentContent" label="评论内容" min-width="18%">
        <template slot-scope="scope">
          <div style="width:100%;height:45px;overflow: hidden;" v-html="scope.row.commentContent"></div>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="15%">
        <template slot-scope="scope">
          <el-button size="small" v-on:click="openUpd(scope.row.commentID)"
            >编辑</el-button
          >
          <el-button size="small" v-on:click="dodel(scope.row.commentID)"
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
      :title="isUpd ? '编辑评论' : '添加评论'"
      @opened="showEdit"
      :close-on-click-modal="false"
      :visible.sync="add_dialog"
      width="60%"
    >
      <el-form
        :model="comment"
        :rules="rules"
        label-position="top"
        ref="comment"
        label-width="80px"
      >
        <el-form-item label="新闻编号" prop="commentNewsID">
          <el-input v-model="comment.commentNewsID"></el-input>
        </el-form-item>
        <el-form-item label="会员编号" prop="commentUserID">
          <el-input v-model="comment.commentUserID"></el-input>
        </el-form-item>
        <el-form-item label="会员账号" prop="commentUserName">
          <el-input v-model="comment.commentUserName"></el-input>
        </el-form-item>
        <el-form-item label="新闻标题" prop="commentNewsTitle">
          <el-input v-model="comment.commentNewsTitle"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" prop="commentContent">
          <el-input v-model="comment.commentContent" v-show="false"></el-input>
        </el-form-item>

        <!-- 富文本编辑器 -->
        <div id="div1"></div>
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
      pagesize: 7, //设置每页显示条目个数为7
      currentPage: 1, //设置当前页默认为1
      total: null, //分页前的数据
      totalnum: "",
      comment: {
        commentNewsID: "",
        commentUserID: "",
        commentUserName: "",
        commentNewsTitle: "",
        commentContent: "",
      },
      tableData: [],
      add_dialog: false,
      dialogVisible: false,
      isUpd: false,
      editor: null,
      doupurl: this.$store.state.domain + "/admin/tools/doupload",
      rules: {
        commentNewsID: [
          { required: true, message: "请填写评论新闻编号", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        commentUserID: [
          { required: true, message: "请填写评论会员编号", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        commentUserName: [
          { required: true, message: "请填写评论会员账号", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        commentNewsTitle: [
          { required: true, message: "请填写评论新闻标题", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
        commentContent: [
          { required: true, message: "请填写评论内容", trigger: "blur" },
          { min: 1, message: "长度至少 1 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/commentManagement/comlist",
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
      this.comment = {
        commentNewsID: "",
        commentUserID: "",
        commentUserName: "",
        commentNewsTitle: "",
        commentContent: "",
      };
    },

    openUpd: function (commentID) {
      this.isUpd = true;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/commentManagement/findbycomID",
        method: "get",
        params: { commentID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.comment = res.data;
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
        url: _this.$store.state.domain + "/admin/commentManagement/addapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.comment),
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
        url: _this.$store.state.domain + "/admin/commentManagement/updapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.comment),
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

    dodel: function (commentID) {
      // alert(uuid);
      // return ;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/commentManagement/dodel",
        method: "get",
        params: { commentID },
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

    showEdit: function () {
      var _this = this;
      var E = window.wangEditor;
      var editor = new E(document.getElementById("div1"));
      editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        _this.comment.commentContent = newHtml;
      };
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500; // 修改为 500ms
      // 或者 const editor = new E( document.getElementById('div1') )
      editor.config.uploadImgServer = _this.doupurl;
      editor.config.uploadFileName = "_file";
      editor.config.uploadImgHooks = {
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          // console.log("customInsert", result);
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(_this.$store.state.domain + result.data[0]);
        },
      };
      editor.create();
      editor.txt.html(this.comment.commentContent); // 重新设置编辑器内容
      this.editor = editor; // 对象赋值
    },

    handleClose() {
      this.add_dialog = false;
      this.editor.destroy(); //销毁富文本编辑器
      this.editor = null;
    },
  },

  created: function () {
    this.init();
  },

  // 过滤器
  filters: {

    // el-input 超出+省略号
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
      }
      return value;
    },
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