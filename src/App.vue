<template lang="pug">

#app(:class="{busy: authorizing || error}")

  el-container(
  v-loading.fullscreen.lock="authorizing"
  element-loading-text="Авторизация ..."
  )

    el-header
      app-menu

    el-main

      router-view#app-view(v-if="authorized || $route.name === 'signIn'")

      .join(v-else)

        hello-world

        p.buttons(v-if="!authorizing")
          router-link(to="/sign-in" tag="div")
             el-button(type="primary") Вход для клиентов

</template>
<script>

import { mapState, mapActions } from 'vuex';
import { CLEAR_ERROR } from 'sistemium-vue/store/auth/actions';

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
  },

  methods: {
    ...mapActions('auth', [CLEAR_ERROR]),
  },

  components: {
    AppMenu,
    HelloWorld,
  },

};

</script>
