<template>
  <div class="personal-maxbox">
    <Nuxt-link to="search">
      <el-input
        :disabled="true"
        prefix-icon="el-icon-search"
        placeholder="搜索"
      ></el-input>
    </Nuxt-link>
    <div class="personal-icontext-maxbox">
      <Nuxt-link to="">
        <div class="personal-icontext-box">
          <i class="el-icon-warning-outline"></i>
          <li class="personal-li-item">关于我们</li>
        </div>
      </Nuxt-link>
      <Nuxt-link to="columnCenter">
        <div class="personal-icontext-box">
          <i class="el-icon-set-up"></i>
          <li class="personal-li-item">
            新闻分类
            <i
              style="float: right; font-size: 18px; line-height: 1.3"
              class="el-icon-arrow-right"
            ></i>
          </li>
        </div>
      </Nuxt-link>
      <Nuxt-link to="">
        <div class="personal-icontext-box">
          <i class="el-icon-connection"></i>
          <li class="personal-li-item">栏目中心</li>
        </div>
      </Nuxt-link>
      <Nuxt-link to="">
        <div class="personal-icontext-box">
          <i class="el-icon-message"></i>
          <li class="personal-li-item">我的消息</li>
        </div>
      </Nuxt-link>

      <Nuxt-link to="individual" >
        <div class="personal-icontext-box">
          <i class="el-icon-user"></i>
          <li class="personal-li-item">个人中心</li>
        </div>
      </Nuxt-link>

      <Nuxt-link to="">
        <div class="personal-icontext-box">
          <i class="el-icon-tickets"></i>
          <li class="personal-li-item">意见反馈</li>
        </div>
      </Nuxt-link>
    </div>
    <Nuxt-link to="/">
      <div class="icon-erro-box">
        <i class="el-icon-error"></i>
      </div>
    </Nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style>
.personal-maxbox {
  padding: 15px;
}

.personal-icontext-box {
  width: 100%;
  height: 40px;
  padding: 10px 0;
  color: #000;
}

.personal-icontext-maxbox i {
  float: left;
  font-size: 24px;
}

.personal-icontext-maxbox li {
  padding-left: 15px;
  float: left;
  font-size: 14px;
  line-height: 1.5;
}

.personal-icontext-maxbox {
  width: 100%;
  height: auto;
  position: relative;
  bottom: -130px;
}

.icon-erro-box i {
  position: fixed;
  bottom: 50px;
  font-size: 40px;
  color: #000;
}
</style>