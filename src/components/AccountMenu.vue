<template lang="pug">

el-submenu.account-menu(index="index")
  template(slot="title") {{ account.name }}
  el-menu-item(index="/logout") Выход

</template>
<script>

export default {

  name: 'AccountMenu',

  props: {
    /**
     * @property {String} account.name
     */
    account: Object,
    index: String,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
