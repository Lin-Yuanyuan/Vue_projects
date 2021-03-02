<template>
  <div>
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
        style="width: 100%"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="newsID" sortable label="新闻编号" min-width="8%">
        </el-table-column>
        <el-table-column prop="newsTitle" label="新闻标题" min-width="23%">
          <template slot-scope="scope">
            {{ scope.row.newsTitle | ellipsis }}
          </template>
        </el-table-column>

        <el-table-column
          prop="category"
          sortable
          label="新闻栏目"
          min-width="9%"
        >
        </el-table-column>

        <el-table-column prop="newsImagePath" label="封面图片" min-width="10%">
          <template slot-scope="scope">
            <img
              v-bind:src="scope.row.newsImagePath | domain($store.state.domain)"
              width="40"
              height="40"
            />
          </template>
        </el-table-column>

        <el-table-column
          prop="publisher"
          sortable
          label="发布者"
          min-width="8%"
        >
        </el-table-column>
        <el-table-column
          prop="newsDate"
          sortable
          label="发布时间"
          min-width="12%"
        >
        </el-table-column>
        <el-table-column prop="comment" sortable label="评论数" min-width="8%">
        </el-table-column>
        <el-table-column prop="action" sortable label="点赞数" min-width="8%">
        </el-table-column>
        <el-table-column label="操作" min-width="14%">
          <template slot-scope="scope">
            <el-button size="small" v-on:click="openUpd(scope.row.newsID)"
              >编辑</el-button
            >
            <el-button size="small" v-on:click="dodel(scope.row.newsID)"
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
    </div>
    <el-dialog
      :title="isUpd ? '编辑文章' : '添加文章'"
      :close-on-click-modal="false"
      :visible.sync="add_dialog"
      @opened="showEdit"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :model="news"
        :rules="rules"
        label-position="top"
        ref="news"
        label-width="80px"
      >
        <el-form-item label="新闻标题" prop="newsTitle">
          <el-input v-model="news.newsTitle"></el-input>
        </el-form-item>

        <el-form-item label="新闻栏目" prop="category">
          <el-input v-model="news.category"></el-input>
        </el-form-item>

        <el-form-item label="新闻描述" prop="newsDesc">
          <el-input v-model="news.newsDesc"></el-input>
        </el-form-item>

        <el-form-item label="发布者" prop="publisher">
          <el-input v-model="news.publisher"></el-input>
        </el-form-item>

        <el-form-item label="新闻内容" prop="newsContent">
          <el-input v-model="news.newsContent" v-show="false"></el-input>
        </el-form-item>

        <!-- 富文本编辑器 -->
        <div id="div1"></div>

        <el-form-item label="封面图片">
          <el-input v-model="news.newsImagePath" v-show="false"></el-input>
        </el-form-item>
        <el-upload
          :action="doupurl"
          list-type="picture-card"
          name="_file"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="syncinput"
        >
          <i class="el-icon-plus" v-if="news.newsImagePath.length == 0"></i>
          <img
            v-else
            :src="$store.state.domain + news.newsImagePath"
            width="146"
            height="146"
            alt=""
          />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" style="z-index: 99">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
  // ------------------------------------------------
  data() {
    return {
      pagesize: 7, //设置每页显示条目个数为
      currentPage: 1, //设置当前页默认为1
      total: null, //分页前的数据
      totalnum: "",

      // domain:,
      doupurl: this.$store.state.domain + "/admin/tools/doupload",
      tableData: [],
      add_dialog: false,
      dialogVisible: false,
      dialogImageUrl: "",
      editor: null,
      isUpd: false,
      news: {
        newsTitle: "",
        category: "",
        publisher: "",
        newsContent: "",
        newsImagePath: "",
        newsDesc: "",
      },
      rules: {
        newsTitle: [
          { required: true, message: "请填写新闻标题", trigger: "blur" },
          { min: 5, message: "长度至少 5 个字符", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请填写新闻栏目", trigger: "blur" },
        ],
        newsDesc: [
          { required: true, message: "请填写新闻描述", trigger: "blur" },
        ],
        publisher: [
          { required: true, message: "请填写发布者", trigger: "blur" },
        ],
        newsContent: [
          { required: true, message: "请填写文章内容", trigger: "blur" },
          { min: 20, message: "长度至少 20 个字符", trigger: "blur" },
        ],
      },
    };
  },
  // ------------------------------------------------ ----------------------

  methods: {
    syncinput: function (response, file, fileList) {
      // console.log(response, file, fileList);
      this.dialogImageUrl = this.$store.state.domain + response.data[0];
      this.news.newsImagePath = response.data[0];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("file:", file);
      // this.news.newsImagePath = file.url;
      this.dialogVisible = true;
    },
    openAdd: function () {
      this.add_dialog = true;
      this.isUpd = false;
      this.news = {
        newsTitle: "",
        category: "",
        publisher: "",
        newsContent: "",
        newsImagePath: "",
        newsDesc: "",
      };
    },
    handleClose() {
      this.add_dialog = false;
      this.editor.destroy(); //销毁富文本编辑器
      this.editor = null;
    },

    showEdit: function () {
      var _this = this;
      var E = window.wangEditor;
      var editor = new E(document.getElementById("div1"));
      editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        _this.news.newsContent = newHtml;
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
      editor.txt.html(this.news.newsContent); // 重新设置编辑器内容
      this.editor = editor; // 对象赋值
    },

    dosubmit: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/news/addapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.news),
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
        url: _this.$store.state.domain + "/admin/news/updapi",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.news),
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

    dodel: function (newsID) {
      // alert(uuid);
      // return ;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/news/dodel",
        method: "get",
        params: { newsID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.$notify({
              title: "成功",
              message: res.msg,
              type: "success",
            });
            _this.init(); // 添加成功后，重新调用查询数据接口
          } else {
            _this.$notify.error({
              title: "失败",
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
    openUpd: function (newsID) {
      this.isUpd = true;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/news/findbynewsID",
        method: "get",
        params: { newsID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.news = res.data;
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

    handleClick(row) {
      console.log(row);
    },

    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/admin/news/newlist",
      })
        .then(function (response) {
          var res = response.data;
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

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },

  created: function () {
    this.init();
  },

  //  过滤器
  filters: {
    // 图片处理
    domain: function (imgurl, dmstr) {
      if (imgurl == null || imgurl.length == 0) {
        return imgurl;
      }
      // console.log("imgurl",imgurl);
      if (imgurl.indexOf("http:") == 0) {
        return imgurl;
      } else {
        return dmstr + imgurl;
      }
    },
    // el-input 超出+省略号
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    },
  },
};
</script>

<style>
.el-upload-list--picture-card .el-upload-list__item {
  display: none;
}

.el-table th.gutter {
  display: table-cell !important;
}

.el-table colgroup.gutter {
  display: table-cell !important;
}
.el-table {
  /* font-size: 16px; */
  color: #000;
}
.el-button {
  /* font-size: 16px; */
  font-weight: 600;
  -moz-box-shadow: 0 0 4px #06c;
  -webkit-box-shadow: 0 0 4px #06c;
  box-shadow: 0 0 4px #06c;
}
.el-autocomplete {
  width: 100%;
}
/* .el-icon-arrow-right {
  color:#000;
} */

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
/* 修改头部字体 */
.el-table thead {
  color: rgba(46, 45, 45, 0.7) !important;
}
</style>