<template lang="pug">

.home
  hello-world(msg="Sistemium")
  .version v{{ version }}

</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return { version: process.env.VUE_APP_VERSION };
  },
};
</script>
<style lang="scss">
@import "../styles/responsive";

.home {
  text-align: center;
  padding-top: 20px;
}

</style>
