<template>
  <div>
    <steve />
    <div class="header-navbox">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo sidear_container scroll"
        mode="horizontal"
        @select="handleSelect"
      >

        <el-menu-item class="head-item" index="1">
          <nuxt-link to="/"> 商业 </nuxt-link>
        </el-menu-item>
        <el-menu-item class="head-item" index="2">
          <nuxt-link to="intelligence"> 智能 </nuxt-link>
        </el-menu-item>
        <el-menu-item class="head-item" index="3">
          <nuxt-link to="design"> 设计 </nuxt-link>
        </el-menu-item>
         <el-menu-item class="head-item" index="4">
          <nuxt-link to="fashion"> 时尚 </nuxt-link>
        </el-menu-item>
          <el-menu-item class="head-item" index="5">
          <nuxt-link to="entertainment"> 娱乐 </nuxt-link>
        </el-menu-item>
         <el-menu-item class="head-item" index="6">
          <nuxt-link to="culture"> 文化 </nuxt-link>
        </el-menu-item>
         <el-menu-item class="head-item" index="7">
          <nuxt-link to="game"> 游戏  </nuxt-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="height:40px">
       <!--  空的div，设置高度为fixed的元素的高度 解决fixed遮盖下方的问题 -->
    </div>

    <div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import steve from "~/components/centre.vue";
export default {
  components: { steve },
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
@import "@/static/css/default.css";
</style>