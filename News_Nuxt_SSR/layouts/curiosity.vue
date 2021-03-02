<template>
  <div class="curiosity-maxbox">
    <user-heards />
    <user-mains />
    <user-footer />
  </div>
</template>

<script>
import userHeards from "~/components/userHeards";
import userMains from "~/components/userMains";
import userFooter from "~/components/userFooter"
export default {
    components: { userHeards },
    components: { userMains },
     components: { userFooter },
};
</script>

<style>
.curiosity-maxbox{
  background: #eee;
}
</style>