<template lang="pug">

el-dialog.action-pictures-edit(
  title="Изображения варианта акции"
  :before-close="handleClose"
  :visible.sync="drawerOpen"
  :append-to-body="true"
  :destroy-on-close="true"
  ref="drawer"
  width="80%"
  top="4vh"
)
  section.content(
    v-loading="loading"
    :element-loading-text="loadingMessage"
    element-loading-spinner="el-icon-loading"
  )

    .selected

      action-pictures(:article-picture-ids="model" v-if="model.length")
        template(v-slot:etc="{ picture }")
          .status(@click="removeSelected(picture)")
            i.el-icon-remove

      .empty(v-else)
        el-alert(:show-icon="true" title="Изображения не выбраны" :closable="false")
          p Используйте поиск чтобы добавить

    search-input(v-model="searchText" :debounce="500" size="mini")

    article-picture-select-list.pictures(
      v-model="model"
      :search-text="searchText"
      @loadingMessage="onLoadingMessage"
    )

  form-buttons(
    :loading="loading"
    :changed="changed"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
  )

</template>
<script>

import DrawerEditor from '@/lib/DrawerEditor';
import FormButtons from '@/lib/FormButtons.vue';
import Action from '@/models/Action';
import ActionPictures from '@/components/actions/ActionPictures.vue';
import ArticlePictureSelectList from '@/components/catalogue/ArticlePictureSelectList.vue';

const NAME = 'ActionPicturesEdit';

export default {

  name: NAME,
  mixins: [DrawerEditor],

  components: {
    ArticlePictureSelectList,
    ActionPictures,
    FormButtons,
  },

  props: {
    actionId: String,
  },

  data() {
    return {
      // loading: false,
      model: [],
      searchText: '',
      pictures: [],
    };
  },

  computed: {
    modelOrigin() {
      return this.actionInstance().articlePictureIds || [];
    },
  },

  methods: {

    onLoadingMessage(message) {
      this.loadingMessage = message;
    },

    actionInstance() {
      return this.getPlainInstanceById(Action, this.actionId);
    },

    saveClick() {
      const data = this.actionInstance();
      data.articlePictureIds = this.model;
      this.performOperation(() => Action.create(data));
    },

    removeSelected({ id }) {
      this.model.splice(this.model.indexOf(id), 1);
    },
  },

  created() {
    this.$watch('actionId', () => {
      this.model = [...this.modelOrigin];
    }, { immediate: true });
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.pictures, .search-input {
  margin-top: $margin-top;
}

.selected {
  min-height: 133px;
}

.pictures {
  // min-height: 50px;
  .picture {
    & + .picture {
      border-top: $list-cell-borders;
    }
  }
}

.status {
  position: absolute;
  top: 0;
  font-size: 20px;
  color: $green;
}

.content {
  padding: 0 $margin-right 0;
}

.form-buttons {
  margin-top: $margin-top;
}

</style>
