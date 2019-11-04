import PictureGallery from '@/components/PictureGallery.vue';

export default {

  name: 'PossibleOutletGallery',
  mixins: [PictureGallery],

  props: {
    images: Array,
  },

  computed: {
    avatarId() {
      return this.images[0].id;
    },
  },

  methods: {},

};
