<template lang="pug">

el-menu(mode="horizontal" :router="false")
  el-submenu.account-menu(index="index")
    template(slot="title")
      span.title
        img(src="../assets/icons8-test-account.svg")
        span {{ account.name }}
    el-menu-item(
      v-for="account in otherAccounts" :key="account.authId"
      @click="switchToAccount(account)"
    )
      img(src="../assets/icons8-change-user.svg")
      span {{ account.name }}
    el-menu-item(@click="addAccountModal")
      img(src="../assets/icons8-add.svg")
      span Добавить аккаунт
    el-menu-item(index="/logout" @click="logoutMessage")
      img(src="../assets/icons8-shutdown.svg")
      span Выход

  el-dialog(
    title="Добавление учетной записи"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="addAccountModalVisible"
    :destroy-on-close="true"
  )
    sign-in(@cancel="addAccountModalVisible=false")

</template>
<script>

import filter from 'lodash/filter';
import { LOGOFF, LOG_ACCOUNT } from 'sistemium-vue/store/auth/actions';
import * as g from 'sistemium-vue/store/auth/getters';
import { createNamespacedHelpers } from 'vuex';
import SignIn from '@/views/SignIn.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export default {

  name: 'AccountMenu',
  components: { SignIn },
  props: {
    /**
     * @property {String} account.name
     */
    account: Object,
    index: String,
  },

  data() {
    return {
      addAccountModalVisible: false,
    };
  },

  computed: {
    ...mapGetters({
      accounts: g.SAVED_ACCOUNTS,
    }),
    otherAccounts() {
      return filter(this.accounts, ({ authId }) => authId !== this.account.authId);
    },
  },

  methods: {

    ...mapActions({
      logoff: LOGOFF,
      logAccount: LOG_ACCOUNT,
    }),

    logoutMessage() {

      this.$confirm('Завершить работу на данном устройстве?', 'Выход', {
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отменить',
        type: 'warning',
      })
        .then(() => {
          this.logoff();
        })
        .catch(() => {
        });

    },

    switchToAccount(account) {
      this.$debug('switchToAccount', account);
      this.logAccount(account)
        .then(() => this.$router.push('/'))
        .catch(e => this.$error(e));
    },

    addAccountModal() {

      this.addAccountModalVisible = true;

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
