<template lang="pug">

el-menu(mode="horizontal" :router="false")
  el-submenu.account-menu(index="index")
    template(slot="title")
      span.title
        img(src="../assets/icons8-test-account.svg")
        span {{ account.name }}
    el-menu-item(index="/logout" @click="logoutMessage")
      img(src="../assets/icons8-shutdown.svg")
      span Выход

</template>
<script>

import { LOGOFF } from 'sistemium-vue/store/auth/actions';
import { mapActions } from 'vuex';

export default {

  name: 'AccountMenu',

  props: {
    /**
     * @property {String} account.name
     */
    account: Object,
    index: String,
  },

  methods: {

    ...mapActions('auth', [LOGOFF]),

    logoutMessage() {

      this.$confirm('Завершить работу на данном устройстве?', 'Выход', {
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        type: 'warning',
      }).then(() => {
        this[LOGOFF]();
      }).catch(() => {});

    },

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";
@import "../styles/responsive";

.title {
  border-bottom: none !important;
  img {
    height: 30px;
    width: 30px;
  }
  > span {
    margin-left: $padding;
  }
}

@include responsive-only(gt-sm) {
  .title img {
    display: none;
  }
}

@include responsive-only(lt-sm) {
  .title span {
    display: none;
  }
}

</style>
