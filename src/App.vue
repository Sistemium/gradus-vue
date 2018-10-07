<template lang="pug">

#app
  el-container
    el-header
      app-menu
    el-main
      router-view

</template>
<script>

import AppMenu from '@/components/AppMenu.vue';

export default {
  components: { AppMenu },
};

</script>
<style lang="scss">

@import "styles/variables";

body {
  background: $gray-background;
}

#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
}

</style>
