import { createNamespacedHelpers } from 'vuex';
// import { addMonths } from '@/lib/dates';
import axios from 'axios';

const { mapState } = createNamespacedHelpers('auth');

export default {

  computed: {
    ...mapState({
      token: 'id',
      org(auth) {
        return (auth && auth.account) ? auth.account.org : null;
      },
    }),
    // isNative,
    headers() {
      return { authorization: this.token };
    },
  },

  methods: {

    imsFolderUrl(folder) {
      return `/ims/${this.org}?folder=${folder}`;
    },

    async imsGet(folder, src) {
      const url = this.imsFolderUrl(folder);
      this.$debug(url);
      return axios.get(url, {
        params: {
          trim: 'true',
          src,
        },
        headers: this.headers,
      })
        .then(res => {
          this.$debug(res);
          return res.data;
        });
    },

  },

};
