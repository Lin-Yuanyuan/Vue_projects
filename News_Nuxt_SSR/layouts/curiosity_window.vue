<template>
  <div class="curiosity_window-maxbox">
    <user-heards />
    <Nuxt/>
    <user-footer />
  </div>
</template>

<script>
import userHeards from "~/components/userHeards";
import userFooter from "~/components/userFooter"
export default {
    components: { userHeards },
     components: { userFooter },
};
</script>

<style>
.curiosity_window-maxbox{
  background: #eee;
}
</style>