<template>
  <div>
    <div class="individual-header">
      <Nuxt-link
        :to="{
          path: '/personal',
          query: {
            newsID: this.$route.query.newsID,
            newsTitle: this.$route.query.newsTitle,
          },
        }"
      >
        <img
          class="individual-headerimg"
          width="22px"
          height="22px"
          src="/images/fanhui.png"
          alt=""
        />
      </Nuxt-link>
      <span class="individual-header-text">个人中心</span>
    </div>
    <div class="individual-menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo scroll"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item class="individual-menu-item-l" index="1">
          <Nuxt-link to="/favorite_articles">喜欢的文章</Nuxt-link>
        </el-menu-item>
        <el-menu-item class="individual-menu-item-r" index="2">
          <Nuxt-link to="/participation"> 参与的研究 </Nuxt-link>
        </el-menu-item>
      </el-menu>
      <Nuxt />
    </div>
    
  </div>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.individual-header {
  padding: 10px 15px 10px 15px;
}
.individual-headerimg {
  float: left;
}
.individual-header-text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.individual-menu {
  clear: both;
}
.individual-menu {
  position: absolute;
  width: 100%;
  height: auto;
}
</style>
<style scoped>
.el-menu-demo {
  width: 70%;
  margin: 0 auto;
}
.el-menu-demo >>> .individual-menu-item-l {
  float: left;
}
.el-menu-demo >>> .individual-menu-item-r {
  float: right;
}
</style>
