<template>

  <el-header class="header">
  <!--    style="display:flex;justify-content:flex-end" -->
    <el-menu
      :style="note"
      :default-active="activeIndex"
      class="el-menu-demo hidden-xs-only"
      mode="horizontal"
      @select="handleSelect"
      text-color="#000"
      active-text-color="#ffd04b"
    >
     
      <img
        style="width: 60px; heigth: 60px;float:left;"
        src="~/static/images/logo.jpg"
        alt=""
      />

      <span style="font-size:18px; line-height: 60px;margin-left:20px;">好奇心日报后台管理</span>
  
      <el-submenu index="1" :style="note" style="float:right">
        <template slot="title" :style="note"
          >管理员：{{ $store.state.adminName }}</template
        >
        <el-menu-item :style="note" @click="logout()">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
 
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      activeIndex: "1",
      note: {
        backgroundImage: "url(" + require("~/static/images/bg5.png") + ")",
      },
    };
  },
  methods: {
    logout: function () {
      var _this = this;
      axios({
        url: this.$store.state.domain + "/admin/ucenter/dologout",
        method: "get",
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: true, // default:false
        //注意：客户端请求的url路径域名要求和服务端一致
      })
        .then(function (response) {
          console.log("response:", response);
          var res = response.data;
          console.log("res:", res);
          // if (res.errno == 0) {
          _this.$notify({
            title: "成功",
            message: "退出成功",
            type: "success",
            duration: 1000,
          });
          setTimeout(function () {
            _this.$router.push({ path: "/admin/adminLogin" });
          }, 1000);
          // } else {
          //   _this.$notify.error({
          //     title: "失败！",
          //     message: res.errmsg,
          //   });
          // }
        })
        .catch(function () {});
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.header {
  width: 100%;
  padding: 0;
 
}
</style>