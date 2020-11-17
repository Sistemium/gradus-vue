<template lang="pug">

.hello
  img(alt="VR logo" src="/images/3colors144.png")
  h1 {{ msg }}
  .version v{{ version }}

</template>
<script>

import log from 'sistemium-debug';

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
  data() {
    return { version: process.env.VUE_APP_VERSION };
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";
@import "../styles/responsive";

.hello {
  text-align: center;
  @include responsive-only(gt-xs) {
    margin-top: 40px;
  }
}

h1 {
  margin: 20px 0;
  font-size: 56px;
}

.version {
  position: absolute;
  bottom: $padding;
  left: $padding;
  right: $padding;
}

</style>
