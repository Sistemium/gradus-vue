import { createNamespacedHelpers } from 'vuex';
import * as getters from '@/vuex/campaigns/getters';
// import * as a from '@/vuex/campaigns/actions';
import PictureGallery from './PictureGallery.vue';

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
      // setActive: a.SET_PICTURE_AS_AVATAR,
      // removeArticlePicture: a.REMOVE_GALLERY_PICTURE,
    }),
  },

};
