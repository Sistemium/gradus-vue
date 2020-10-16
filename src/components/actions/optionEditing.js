import { createNamespacedHelpers } from 'vuex';
import * as a from '@/vuex/campaigns/actions';
import * as g from '@/vuex/campaigns/getters';
import campaignsAuth from '@/components/campaigns/campaignsAuth';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

export default {
  mixins: [campaignsAuth],
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
