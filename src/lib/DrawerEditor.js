import log from 'sistemium-debug';
import cloneDeep from 'lodash/cloneDeep';
import matchesDeep from './matchesDeep';

const { error } = log('DrawerEditor');

export default {
  props: {
    from: Object,
    forceModified: Boolean,
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
      return this.forceModified || !matchesDeep(this.model, this.modelOrigin);
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
      if (drawer.closeDrawer) {
        drawer.closeDrawer();
      } else {
        drawer.handleClose();
      }
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

    async validate(form = this.$refs.form) {

      return new Promise((resolve, reject) => {
        form.validate(isValid => {
          if (isValid) {
            resolve(isValid);
          } else {
            reject(new Error('Форма не заполнена корректно'));
          }
        });
      });

    },

    showError(e) {
      return this.$message.error({
        message: e.message,
        // offset: 20,
        duration: 7500,
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
