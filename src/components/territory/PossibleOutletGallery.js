import PictureGallery from '@/components/PictureGallery.vue';

export default {

  name: 'PossibleOutletGallery',
  mixins: [PictureGallery],

  props: {
    images: Array,
  },

  computed: {
    avatarId() {
      const [avatar] = this.images;
      return avatar && avatar.id;
    },
  },

  methods: {},

};
