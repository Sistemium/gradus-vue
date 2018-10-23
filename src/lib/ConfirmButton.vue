<template lang="pug">

el-button.confirm-button(:type="buttonType" @click="onClick") {{ buttonText }}

</template>
<script>

export default {

  name: 'ConfirmButton',

  props: {
    text: String,
    confirmText: String,
    timeout: {
      type: Number,
      default: 5000,
    },
  },

  data() {
    return {
      confirmation: false,
    };
  },

  computed: {

    buttonText() {
      return this.confirmation ? this.confirmText : this.text;
    },

    buttonType() {
      return this.confirmation ? 'danger' : 'default';
    },

  },

  methods: {
    onClick() {

      const onTimeout = () => {
        this.confirmation = false;
      };

      const { confirmation } = this;

      if (confirmation) {
        clearTimeout(confirmation);
        onTimeout();
        this.$emit('confirm');
      } else {
        this.confirmation = setTimeout(onTimeout, this.timeout);
      }

    },
  },

};

</script>
