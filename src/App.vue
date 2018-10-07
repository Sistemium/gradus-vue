<template lang="pug">

#app
  el-container
    el-header
      app-menu
    el-main
      router-view#app-view

</template>
<script>

import AppMenu from '@/components/AppMenu.vue';

export default {
  components: { AppMenu },
  computed: {},
};

</script>
