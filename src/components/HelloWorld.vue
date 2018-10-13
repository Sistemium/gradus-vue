<template lang="pug">

.hello
  img(alt="VR logo" src="../assets/3colors144.png")
  h1 {{ msg }}
  p The project it just initialized and no functionality is implemented yet

</template>
<script>

import log from 'sistemium-telegram/services/log';

const name = 'HelloWorld';
const { debug } = log(name);

debug('imported');

export default {
  name,
  props: {
    msg: {
      type: String,
      default: 'Sistemium',
    },
  },
};

</script>
<style scoped lang="scss">

.hello {
  text-align: center;
}

h1 {
  margin: 20px 0;
  font-size: 56px;
}

</style>
