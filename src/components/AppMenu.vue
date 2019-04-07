<template lang="pug">

#app-menu

  el-menu#main-menu(:default-active="$route.path" mode="horizontal" :router="true")

    el-menu-item(index="/")
      img(src="../assets/icons8-home.svg")
      span Начало
    el-menu-item(index="/catalogue")
      img(src="../assets/icons8-moleskine.svg")
      span Каталог
    el-menu-item(index="/campaigns")
      img(src="../assets/icons8-moleskine.svg")
      span Акции
    el-menu-item(index="/targets")
      img(src="../assets/icons8-moleskine.svg")
      span Задачи
    el-menu-item(index="/about")
      img(src="../assets/icons8-info.svg")
      span О проекте

  account-menu#account-menu(
  v-if="account"
  :account="account"
  index="/account"
  )

</template>
<script>

import { mapState } from 'vuex';
import AccountMenu from '@/components/AccountMenu.vue';

export default {

  name: 'AppMenu',

  data() {
    return {
      // activeIndex: '/',
    };
  },

  computed: {
    ...mapState('auth', { account: 'account' }),
  },

  components: { AccountMenu },

};

</script>
<style lang="scss">

@import "../styles/variables";

$img-size: 30px;

#app-menu {

  display: flex;

  #main-menu {
    flex: 1;
  }

  #account-menu {
    /*float: right;*/
  }

}

.el-menu-item {
  img {
    height: $img-size;
    width: $img-size;
    & + * {
      margin-left: $margin-right;
    }
  }
}

</style>
