<template>
  <div class="columnCenter-maxbox">
    <Nuxt-link to="search">
      <el-input
        :disabled="true"
        prefix-icon="el-icon-search"
        placeholder="搜索"
      ></el-input>
    </Nuxt-link>

    <div class="columnCenter-icontext-maxbox">
      <Nuxt-link to="/">
        <div class="columnCenter-icontext-box">
          <i class="el-icon-warning-outline"></i>
          <li class="columnCenter-li-item">商业</li>
        </div>
      </Nuxt-link>
      <Nuxt-link to="intelligence">
        <div class="columnCenter-icontext-box">
          <i class="e el-icon-sunrise-1"></i>
          <li class="columnCenter-li-item">智能</li>
        </div>
      </Nuxt-link>
      <Nuxt-link to="design">
        <div class="columnCenter-icontext-box">
          <i class="el-icon-connection"></i>
          <li class="columnCenter-li-item">设计</li>
        </div>
      </Nuxt-link>
      <Nuxt-link to="fashion">
        <div class="columnCenter-icontext-box">
          <i class="el-icon-message"></i>
          <li class="columnCenter-li-item">时尚</li>
        </div>
      </Nuxt-link>

      <Nuxt-link to="entertainment">
        <div class="columnCenter-icontext-box">
          <i class="el-icon-user"></i>
          <li class="columnCenter-li-item">娱乐</li>
        </div>
      </Nuxt-link>

      <Nuxt-link to="culture">
        <div class="columnCenter-icontext-box">
          <i class="el-icon-tickets"></i>
          <li class="columnCenter-li-item">文化</li>
        </div>
      </Nuxt-link>

      <Nuxt-link to="game">
        <div class="columnCenter-icontext-box">
          <i class="el-icon-tickets"></i>
          <li class="columnCenter-li-item">游戏</li>
        </div>
      </Nuxt-link>
    </div>

    <Nuxt-link to="personal">
      <div class="icon-fanhui-box">
        <img src="@/static/images/fanhui2.png" alt="" />
      </div>
    </Nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "blank",
};
</script>

<style>
.columnCenter-maxbox {
  padding: 15px;
}
.columnCenter-icontext-box {
  width: 100%;
  height: 40px;
  padding: 10px 0;
  color: #000;
}

.columnCenter-icontext-maxbox i {
  float: left;
  font-size: 20px;
}

.columnCenter-icontext-maxbox li {
  padding-left: 15px;
  float: left;
  font-size: 14px;
  line-height: 1.5;
}

.columnCenter-icontext-maxbox {
  width: 100%;
  height: auto;
  position: relative;
  bottom: -100px;
}

.icon-fanhui-box img {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 50px;
}
</style>