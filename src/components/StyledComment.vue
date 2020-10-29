<template lang="pug">

.styled-comment(v-html="text" v-if="text")

</template>
<script>

const NAME = 'StyledComment';

export default {
  name: NAME,
  props: {
    text: String,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.styled-comment {

  display: inline;
  white-space: pre-line;

  /deep/ {
    em {
      color: $orange;
      font-style: normal;
    }

    mark {
      color: $black;
      background-color: $light-green;
      padding: 0 $padding;
    }

    ul {
      white-space: normal;
      margin: $margin-top 0 0;
    }

  }

}

</style>
