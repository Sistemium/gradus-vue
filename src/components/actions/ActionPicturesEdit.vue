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
    v-loading="loading || busyText"
    :element-loading-text="busyText"
    element-loading-spinner="el-icon-loading"
  )

    .selected

      action-pictures(:layout="model" v-if="model.pictures.length")
        template(v-slot:etc="{ picture }")
          .status(@click="removeSelected(picture)")
            i.el-icon-remove

      .empty(v-else)
        el-alert(:show-icon="true" title="Изображения не выбраны" :closable="false")
          p Используйте поиск чтобы добавить

    search-input(v-model="searchText" :debounce="500" size="mini")

    article-picture-select-list.pictures(
      v-model="idsModel"
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

import { v4 } from 'uuid';
import FormButtons from '@/lib/FormButtons.vue';
import set from 'lodash/set';
import map from 'lodash/map';
import find from 'lodash/find';
import filter from 'lodash/filter';
import DrawerEditor from '@/lib/DrawerEditor';
import Action from '@/models/Action';
import ArticlePicture from '@/models/ArticlePicture';
import ActionPictures from '@/components/actions/ActionPictures.vue';
import ArticlePictureSelectList from '@/components/catalogue/ArticlePictureSelectList.vue';
import ims from '@/lib/ims';

const NAME = 'ActionPicturesEdit';

export default {

  name: NAME,
  mixins: [DrawerEditor, ims],

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
      idsModel: [],
      model: {},
      searchText: '',
      busyText: '',
    };
  },

  computed: {
    modelOrigin() {
      /*
      {
      pictures: [
        {
          _id: false,
          id: String,
          articlePictureId: String,
          src: String,
          thumbnailSrc: String,
          label: String,
          height: String,
        },
      ],
      align: String,
      commentText: String,
      }
      */
      return this.actionInstance().layout || {
        pictures: [],
        align: 'left',
        commentText: null,
      };
    },
    idsModelOrigin() {
      return filter(map(this.modelOrigin.pictures, 'articlePictureId'));
    },
  },

  methods: {

    onLoadingMessage(message) {
      this.busyText = message;
    },

    actionInstance() {
      return this.getPlainInstanceById(Action, this.actionId);
    },

    saveClick() {
      const data = this.actionInstance();
      set(data, 'layout', this.model);
      this.performOperation(() => Action.create(data));
    },

    removeSelected({ id }) {
      this.idsModel.splice(this.idsModel.indexOf(id), 1);
    },

    async processPictureUrl({ articlePictureId }) {

      const articlePicture = await ArticlePicture.find(articlePictureId);

      if (!articlePicture) {
        throw new Error(`Not found ArticlePicture ${articlePictureId}`);
      }

      const { pictures } = await this.imsGet('ActionPicture', articlePicture.largeSrc);
      const { src } = find(pictures, { name: 'largeImage' });
      const { src: thumbnailSrc } = find(pictures, { name: 'thumbnail' });

      return {
        src,
        thumbnailSrc,
      };

    },

  },

  created() {

    this.$watchImmediate('actionId', () => {
      this.idsModel = [...this.idsModelOrigin];
      this.model = this.cloneDeep(this.modelOrigin);
    });

    this.$watchImmediate('idsModel', async ids => {

      if (!ids) {
        this.$error('idsModel:empty');
        return;
      }

      const newPictures = ids.map(articlePictureId => {
        const existing = find(this.model.pictures, { articlePictureId });
        return existing || {
          articlePictureId,
          id: v4(),
          src: null,
          thumbnailSrc: null,
        };
      });

      this.model.pictures = newPictures;

      const toProcess = filter(newPictures, ({ src }) => !src);

      const process = toProcess.map(async picture => {
        const sources = await this.processPictureUrl(picture);
        Object.assign(picture, sources);
      });

      await Promise.all(process)
        .catch(e => this.$error(e));

    });

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
