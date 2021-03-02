<template>
  <el-container   >
    <admin-headers id="admin-header"  />
    <el-container class="boxasidemain" >
      <el-container class="asidemain">
        <admin-asidemain />
        <admin-main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import adminHeaders from "~/components/adminHeaders";
import adminAsidemain from "~/components/adminAsidemain";
import adminMain from "~/components/adminMain";
export default {
  components: { adminHeaders },
  components: { adminAsidemain },
  components: { adminMain },
  data() {
    return {
      activeIndex: "1",
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
@import "static/css/admin/default.css";

</style>