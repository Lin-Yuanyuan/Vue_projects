<template>
  <div class="bodymax">
    <user-heards />
    <div class="mainbox">
      <div id="loginForm">
        <input
          class="inp1"
          type="text"
          name="userName"
          placeholder="请输入账号"
          v-model="loginForm.userName"
        />
        <input
          class="inp2"
          type="password"
          name="passwd"
          placeholder="请输入密码"
          v-model="loginForm.userPassword"
        />
        <div class="d1">
          <input
            class="inp3"
            type="text"
            name="vercode"
            placeholder="请输入验证码"
            v-model="loginForm.vercode"
          />
          <div class="d2">
            <img :src="vercodeurl" @click="chagecode" alt="" />
          </div>
        </div>
        <button class="admin-loginBtn" @click="dologin()">登录</button>
        <nuxt-link to="/user/userRegister">
          <button class="admin-registerBtn">注册新用户</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import userHeards from "~/components/userHeards";
export default {
  layout: "common",
  components: { userHeards },
  data() {
    return {
      vercodeurl:
        this.$store.state.domain + "/user/ucenter/code" + "?v=" + Math.random(),
      loginForm: {
        userName: "",
        userPassword: "",
        vercode: "",
      },
    };
  },
  methods: {
    chagecode: function () {
      this.vercodeurl =
        this.$store.state.domain + "/user/ucenter/code" + "?v=" + Math.random();
    },
    dologin: function () {
      var _this = this;
      console.log("denglu:", qs.stringify(_this.loginForm));
      axios({
        url: _this.$store.state.domain + "/user/ucenter/dologin",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.loginForm),
        withCredentials: true, //带凭证，保留cookie
      })
        .then(function (response) {
          console.log("denglu结果：", response);
          var res = response.data;
          if (res.errno == 0) {
            //路由转向
            // _this.$router.push({ path: "/" });
            _this.$notify.success({
              title: "登录成功！",
              message: res.msg,
            });
            location.href = "/";
          } else {
            _this.$notify.error({
              title: "失败！",
              message: res.errmsg,
            });
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "错误！",
            message: "请求错误！",
          });
        });
    },
  },
};
</script>

<style>
@import "@/static/css/publicLogin.css";
</style>