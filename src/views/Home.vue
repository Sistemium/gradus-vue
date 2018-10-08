<template lang="pug">

.home
  img(alt="VR logo" src="../assets/3colors144.png")
  hello-world(msg="Sistemium ")

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
