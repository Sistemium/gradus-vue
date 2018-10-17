<template lang="pug">

el-menu(mode="horizontal" :router="false")
  el-submenu.account-menu(index="index")
    template.title(slot="title") {{ account.name }}
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

.title {
  border-bottom: none !important;
}

</style>
