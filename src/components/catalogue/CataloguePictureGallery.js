import { createNamespacedHelpers } from 'vuex';
import * as getters from '@/vuex/catalogue/getters';
import * as a from '@/vuex/catalogue/actions';
import PictureGallery from '@/components/PictureGallery.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('catalogue');

export default {

  name: 'CataloguePictureGallery',
  mixins: [PictureGallery],

  computed: {
    ...mapGetters({
      activeId: getters.ACTIVE_GALLERY_PICTURE,
      avatarId: getters.AVATAR_PICTURE,
      images: getters.GALLERY_PICTURES,
    }),
  },

  methods: {
    ...mapActions({
      setActive: a.SET_PICTURE_AS_AVATAR,
      removeArticlePicture: a.REMOVE_GALLERY_PICTURE,
    }),
  },

};
