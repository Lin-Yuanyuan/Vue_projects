<template>
  <div class="loginBox">
    <div class="login-input-box">
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
        <button class="pub-Btn" @click="dologin()">登录</button>
        <nuxt-link to="register">
          <button class="pub-Btn">注册新用户</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import qs from "qs";
export default {
  layout: "blank",
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
      let newsID = _this.$route.query.newsID;
      let newsTitle = _this.$route.query.newsTitle;
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
            _this.$notify.success({
              title: "登录成功！",
              message: res.msg,
            });
            //返回上一页并刷新
            // window.location.href = document.referrer;
            // 路由跳转
            _this.$router.push({
              path: "/",
            });
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
.loginBox {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: url(../static/images/bg3.jpg) no-repeat left top fixed;
  background-size: cover;
  font-size: 14px;
}
.login-input-box {
  width: 280px;
  height: 280px;
  margin: 0 auto;
  /* background-color: rgba(0, 0, 0, 0.2); */
  top: 50%;
  margin-top: 150px;
  padding: 30px;
}

.loginForm {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 250px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.inp1,
.inp2 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 250px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.d1 {
  margin-top: 10px;
  width: 280px;
  height: 42px;
}

.inp3 {
  float: left;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 170px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.d2 {
  float: right;
  height: 40px;
  width: 70px;
  cursor: pointer;
  position: relative;
  background-color: rgb(210, 228, 210);
  border-radius: 6px;
}

.pub-Btn {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  border-color: #ffffff;
  font-size: 16px;
  font-weight: 400;
}
</style>