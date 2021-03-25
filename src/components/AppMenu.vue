<template lang="pug">

#app-menu

  el-menu#main-menu(
    :default-active="defaultActive"
    mode="horizontal"
    :router="true"
    :class="{ 'not-root': $route.name !== 'home' }"
  )

    el-menu-item.home-item(index="/" v-if="!menuFix")
      img(src="../assets/icons8-home.svg")
      span Начало
    el-menu-item(index="/catalogue" v-if="!menuFix || menuFix==='catalogue'")
      img(src="../assets/icons8-moleskine.svg")
      span Каталог
    el-menu-item(index="/campaigns" v-if="!menuFix || menuFix==='campaigns'")
      img(src="../assets/icons8-discount.svg")
      span Акции
    //el-menu-item(index="/targets")
      img(src="../assets/icons8-goal.svg")
      span Задачи
    el-menu-item(index="/possibleOutlets" :disabled="!hasOutletsAuth")
      img(src="../assets/icons8-validation.svg")
      span Точки
    el-menu-item(index="/perfectShop")
      img(src="../assets/icons8-shop.svg")
      span PS
    //el-menu-item(index="/about")
      img(src="../assets/icons8-info.svg")
      span О проекте

  el-button.toggle-tabbar(
    v-if="isNative"
    circle
    icon="el-icon-d-caret"
    @click="toggleTabBarClick"
  )

  .print
    el-button(
      v-if="!isNative"
      circle
      size="mini"
      icon="el-icon-printer"
      @click="printClick()"
    )

  account-menu#account-menu(
    v-if="account && !isNative"
    :account="account"
    index="/account"
  )

</template>
<script>

import first from 'lodash/first';
import { mapState } from 'vuex';
import AccountMenu from '@/components/AccountMenu.vue';
import * as native from 'sistemium-vue/services/native';

export default {

  name: 'AppMenu',

  data() {
    return {
      // activeIndex: '/',
    };
  },

  computed: {
    ...mapState('auth', { account: 'account' }),
    defaultActive() {
      return first(this.$route.path.match(/^\/[^/]*/));
    },
    hasOutletsAuth() {
      return this.$hasAuthRole('possibleOutlets')
        || this.$hasAuthRole('admin');
    },
    isNative() {
      return native.isNative();
    },
    menuFix() {
      return process.env.VUE_APP_MENU_FIX || null;
    },
  },

  methods: {
    printClick() {
      window.print();
    },
    toggleTabBarClick() {
      native.toggleTabBar();
    },
  },

  components: { AccountMenu },

};

</script>
<style lang="scss">

@import "../styles/responsive";
@import "../styles/variables";

$img-size: 30px;

#app-menu {

  display: flex;
  align-items: center;

  #main-menu {
    flex: 1;
    // display: flex;
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

.el-button.toggle-tabbar {
  padding: $padding;

  > i {
    font-weight: bold;
    font-size: 25px;
    transform: rotate(45deg);
  }
}

.print {
  height: 60px;
  line-height: 60px;
  border-bottom: solid 1px #e6e6e6;
  .el-button {
    //background: $blue;
  }
}

@include responsive-only(xs) {
  .not-root {
    .el-menu-item:not(.is-active):not(.home-item) {
      display: none;
    }
  }
  .el-menu--horizontal > .el-menu-item:not(.is-active) > span {
    display: none;
  }
}

</style>
