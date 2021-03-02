<template>
  <div :style="note">
    <el-aside width="160px">
      <!-- router开启路由模式 -->
      <el-menu
        :style="note"
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#000"
        active-text-color="#06c"
      >
        <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu> -->

        <nuxt-link to="/" target="_blank">
          <el-menu-item width="100%" index="">
            <i class="el-icon-document"></i>
            <span slot="title">网站首页</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="newsmanage">
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">新闻管理</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="Administrator">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="userManagement">
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">会员管理</span>
          </el-menu-item>
        </nuxt-link>
        <!-- <nuxt-link to="">
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">相册管理</span>
          </el-menu-item>
        </nuxt-link> -->
          <nuxt-link to="commentManagement">
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </nuxt-link>
          <nuxt-link to="actionManagement">
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">点赞管理</span>
          </el-menu-item>
        </nuxt-link>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
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
    jump: function (path) {
      this.$router.push({ path }); // path:path
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-item.is-active {
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0) !important;
  border: 0.5px solid rgb(172, 167, 167);
  box-shadow: 0 0 2px rgb(87, 84, 84);

}
.el-aside {
  height: 100%;
  box-shadow: 0 0 4px #06c;
}

</style>