import log from 'sistemium-telegram/services/log';
import cloneDeep from 'lodash/cloneDeep';
import matchesDeep from './matchesDeep';

const { error } = log('DrawerEditor');

export default {
  props: {
    from: Object,
  },
  data() {
    return {
      loadingMessage: null,
      drawerOpen: false,
      model: null,
    };
  },
  created() {
    this.$nextTick(() => {
      this.drawerOpen = true;
    });
  },
  computed: {
    loading() {
      return !!this.loadingMessage;
    },
    modelOrigin() {
      return null;
    },
    changed() {
      return !matchesDeep(this.model, this.modelOrigin);
    },
  },
  methods: {

    cloneDeep,

    deleteClick() {

    },

    saveClick() {

    },

    handleClose() {
      if (!this.from) {
        this.drawerOpen = false;
        return;
      }
      this.$router.replace(this.from)
        .catch(e => error('handleClose', e));
    },

    cancelClick() {
      const { drawer } = this.$refs;
      if (!drawer) {
        error('cancelClick', 'drawer ref is empty');
        return;
      }
      drawer.closeDrawer();
    },

    async performOperation(op) {

      this.showLoading();

      try {
        await op();
        this.hideLoading();
        this.cancelClick();
      } catch (e) {
        this.hideLoading();
        this.showError(e);
      }

    },

    showError(e) {
      return this.$message.error({
        message: e.message,
        offset: 1,
        duration: 15000,
        showClose: true,
      });
    },

    showLoading() {
      this.loadingMessage = this.$message({
        message: 'Сохранение ...',
        duration: 0,
      });
    },

    hideLoading() {
      if (!this.loadingMessage) {
        return;
      }
      this.loadingMessage.close();
      this.loadingMessage = null;
    },

  },
};
