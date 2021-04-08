import { createNamespacedHelpers } from 'vuex';
import { HAS_AUTHORING } from '@/vuex/campaigns/getters';

const { mapGetters } = createNamespacedHelpers('campaigns');

export default {
  computed: mapGetters({ hasAuthoring: HAS_AUTHORING }),
};
