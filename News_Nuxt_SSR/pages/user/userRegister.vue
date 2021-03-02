<template>
  <div class="RegisterBox">
    <user-heards />
    <div>
      <div class="RegisterMain">
        <from id="regForm">
          <input
            class="reginput"
            type="text"
            name="userName"
            placeholder="请输入账号"
            v-model="registerForm.userName"
          />
          <br />
          <input
            class="reginput"
            type="password"
            name="userPassword"
            placeholder="请输入密码"
            v-model="registerForm.userPassword"
          />
          <br />
          <input
            class="reginput"
            type="password"
            name="repasswd"
            placeholder="请再次输入密码"
            v-model="registerForm.reuserpasswd"
          />
          <br />
          <div class="regdiv">
            <input
              class="regdivinp"
              type="text"
              name="vercode"
              placeholder="请输入验证码"
              v-model="registerForm.vercode"
            />
            <div class="regdivvercode">
              <img :src="vercodeurl" @click="chagecode()" alt="" />
            </div>
          </div>
          <br />
          <button class="RegButton" v-on:click="doreg()">注册</button>
        </from>
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
      registerForm: {
        userName: "",
        userPassword: "",
        reuserpasswd: "",
        vercode: "",
      },
    };
  },

  methods: {
    chagecode: function () {
      this.vercodeurl =
        this.$store.state.domain + "/user/ucenter/code" + "?v=" + Math.random();
    },
    doreg: function () {
      var _this = this;
      console.log("denglu:", qs.stringify(_this.registerForm));
      axios({
        url: _this.$store.state.domain + "/user/ucenter/doreg",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(_this.registerForm),
        withCredentials: true, //带凭证，保留cookie
      })
        .then(function (response) {
          console.log("denglu结果：", response);
          var res = response.data;
          if (res.errno == 0) {
            //路由转向
            _this.$notify.success({
              title: "注册成功！",
              message: res.errmsg,
            });
            // _this.$router.push({ path: 'user/userLogin' });    // 只有配置了路由文件才能这样用
            location.href = "userLogin";
          } else {
            _this.$notify.error({
              title: "注册失败！",
              message: res.errmsg,
            });
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "错误！",
            message: "请求错误！",
          });
          return false; //阻止表单自动提交 默认事件
        });
    },
  },
};
</script>

<style>
@import "@/static/css/publicRegister.css";
</style>