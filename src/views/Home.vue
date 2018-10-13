<template lang="pug">

.home
  hello-world(msg="Sistemium")

</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
<style lang="scss">

.home {
  text-align: center;
  padding-top: 20px;
}

</style>
