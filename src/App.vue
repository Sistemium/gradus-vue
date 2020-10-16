<template lang="pug">

#app(:class="{busy: authorizing || error}")

  el-container(
    v-loading.fullscreen.lock="authorizing"
    element-loading-text="Авторизация ..."
  )

    el-header
      app-menu(v-if="authorized")

    el-main

      router-view#app-view(v-if="authorized || $route.name === 'signIn'")

      .join(v-else)

        hello-world

        .buttons(v-if="!authorizing")
          router-link(to="/sign-in" tag="div")
            el-button(type="primary") Вход для клиентов

</template>
<script>

import { mapState, mapActions } from 'vuex';
import { CLEAR_ERROR, AUTH_INIT } from 'sistemium-vue/store/auth/actions';

import AppMenu from '@/components/AppMenu.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {

  computed: {
    ...mapState('auth', { error: 'error' }),
    authorized() {
      return !!this.$store.state.auth.roles;
    },
    authorizing() {
      return this.$store.state.auth.busy;
    },
    accessToken() {
      return this.$route.query['access-token'];
    },
  },

  methods: {
    ...mapActions('auth', [CLEAR_ERROR, AUTH_INIT]),
    async onToken() {
      if (this.accessToken) {
        await this[AUTH_INIT](this.accessToken);
        await this.updateRouteParams({}, { 'access-token': undefined });
      }
    },
  },

  components: {
    AppMenu,
    HelloWorld,
  },

  created() {
    this.$watch('accessToken', this.onToken, { immediate: true });
  },

};

</script>
<style scoped lang="scss">

@import "./styles/variables.scss";

.join {
  text-align: center;
}

.buttons {
  padding-top: $margin-top/2;
}

@media print {
  .el-header {
    display: none;
  }
}

.el-main {
  // padding: $padding;
}

.el-header {
  // padding: 0 $padding;
}

</style>
