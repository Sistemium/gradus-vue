<template lang="pug">

#app
  el-container
    el-header
      app-menu
    el-main
      el-breadcrumb(v-if="!isRoot" separator-class="el-icon-arrow-right")
        el-breadcrumb-item Начало
        el-breadcrumb-item {{ $route.meta.label }}
      router-view#app-view

</template>
<script>

import AppMenu from '@/components/AppMenu.vue';

export default {
  components: { AppMenu },
  computed: {
    isRoot() {
      return this.$route.name === 'home';
    },
  },
};

</script>
