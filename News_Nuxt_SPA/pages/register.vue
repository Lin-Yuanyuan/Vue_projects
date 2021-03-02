<template>
  <div class="RegisterBox">
    <div class="register-input-box">
      <div id="regForm">
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
            _this.$router.push({ path: 'login' });    // 只有配置了路由文件才能这样用
            // location.href = "login";
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
.RegisterBox {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: url("~@/static/images/bg4.jpg") no-repeat center center fixed;
  background-size: cover;
  font-size: 14px;
}

.register-input-box {
  width: 280px;
  height: 280px;
  margin: 0 auto;
  /* background-color: rgba(0, 0, 0, 0.2); */
  top: 50%;
  margin-top: 150px;
  padding: 30px;
}

.reginput {
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

.regdiv {
  width: 280px;
  height: auto;
}

.regdivinp {
  float: left;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.regdivvercode {
  float: right;
  height: 40px;
  width: 70px;
  cursor: pointer;
  position: relative;
  background-color: rgb(210, 228, 210);
  border-radius: 6px;
}

.RegButton {
  display: block;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  border-color: #ffffff;
}
</style>