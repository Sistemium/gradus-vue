<template lang="pug">

.home
  img(alt="VR logo" src="../assets/3colors180.png")
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
