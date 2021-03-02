<template>
  <div>
    <Nuxt-link to="personal">
      <img
        class="center-steve"
        width="40px"
        height="40px"
        src="@/static/images/steve.jpg"
        alt=""
      />
    </Nuxt-link>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.center-steve {
  margin-left: 15px;
  position: fixed;
  border-radius: 50%;
  bottom: 50px;
  z-index: 10;
}
</style>