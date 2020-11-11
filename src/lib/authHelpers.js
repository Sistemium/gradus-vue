import Vue from 'vue';

import { createNamespacedHelpers } from 'vuex';
import { HAS_ROLE } from 'sistemium-vue/store/auth/getters';

const { mapGetters } = createNamespacedHelpers('auth');

Vue.mixin({
  computed: mapGetters({ $hasAuthRole: HAS_ROLE }),
});
