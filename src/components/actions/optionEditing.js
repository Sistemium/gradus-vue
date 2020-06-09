import { createNamespacedHelpers } from 'vuex';
import * as a from '@/vuex/campaigns/actions';
import * as g from '@/vuex/campaigns/getters';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

export default {
  computed: {
    ...mapGetters({
      optionCopy: g.ACTION_OPTION_COPY,
    }),
  },
  methods: {
    ...mapActions({
      onCopyOption: a.COPY_ACTION_OPTION,
    }),
  },
};
