<template lang="pug">

.hello
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
    msg: String,
  },
};

</script>
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
}
</style>
