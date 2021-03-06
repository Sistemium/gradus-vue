import { createNamespacedHelpers } from 'vuex';
import * as getters from '@/vuex/campaigns/getters';
import * as a from '@/vuex/catalogue/actions';
import PictureGallery from '@/components/PictureGallery.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('campaigns');

export default {

  name: 'CampaignsPictureGallery',
  mixins: [PictureGallery],

  computed: {
    ...mapGetters({
      activeId: getters.ACTIVE_GALLERY_PICTURE,
      images: getters.GALLERY_PICTURES,
    }),
    avatarId: () => undefined,
  },

  methods: {
    ...mapActions({
      removeArticlePicture: a.REMOVE_GALLERY_PICTURE,
    }),
  },

};
