<template>
  <el-main class="admin-mainbox" :style="note">
    <Nuxt />
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("~/static/images/bg5.png") + ")",
      },
    };
  },
};
</script>

<style>
</style>