<template lang="pug">

.stm-resize(:style="style" ref="root")
  slot

</template>
<script>

import debounce from 'lodash/debounce';

export default {

  name: 'Resize',

  props: ['padding'],

  data() {
    return {
      style: {},
      top: 0,
      height: 0,
      handleResize: debounce(this.setHeight, 700),
    };
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.setHeight();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {

    setHeight() {
      const { top } = this.$refs.root.getBoundingClientRect();
      this.top = top;
      this.height = window.innerHeight;
      this.style = { 'max-height': `${this.height - this.top - (this.padding || 0)}px` };
    },

  },

};

</script>
<style scoped lang="scss">

.stm-resize {
  overflow-y: scroll;
}

</style>
