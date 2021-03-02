<template>
  <el-container>
    <el-header class="user-header">
      <div class="navbox">
        <div class="section-center">
          <ul class="items cates">
             <li class="item cate">
              <nuxt-link to="/">首页</nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/business">商业 </nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/intelligence">智能 </nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/intelligence">设计 </nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/intelligence">时尚 </nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/intelligence">娱乐 </nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/intelligence">文化 </nuxt-link>
            </li>
            <li class="item cate">
              <nuxt-link to="/user/intelligence">游戏 </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="section-right">
          <nuxt-link to="" class="search">
            <img src="/images/search-fill.png" />
          </nuxt-link>
          <div class="ribbon">
            <div class="login">
              <nuxt-link to="/user/userLogin" class="avatar">
                <img src="/images/missing_face.png" />
                登录
              </nuxt-link>
            </div>
            <a href="#">关于我们</a>
             <div style="color:#fff">
            </div>
          </div>
        </div>
      </div>
    </el-header>
    <div style="height:60px">

    </div>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
@import "static/css/user/userHeards";
</style>