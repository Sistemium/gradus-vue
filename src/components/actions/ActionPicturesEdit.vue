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
    element-loading-spinner="el-icon-loading"
  )

    .pictures

      .action-pictures(
        v-if="model.pictures.length"
        :style="{ 'justify-content': model.align }"
      )
        action-picture-form.picture(
          v-for="picture in model.pictures" :key="picture.id"
          :picture="picture"
          :editable="true"
          @removeClick="removeSelected(picture)"
        )

      .empty(v-else)
        el-alert(:show-icon="true" title="Изображения не выбраны" :closable="false")
          p Используйте поиск чтобы добавить

    .text
      el-input(
        type="textarea"
        autosize
        size="mini"
        v-model="model.commentText"
        :clearable="true"
        placeholder="Текстовое пояснение к иллюстрации"
      )

    .controls
      .searching
        search-input(
          v-model="searchText" :debounce="850"
          size="mini"
          placeholder="поиск изображений"
        )
      .take-photo
        take-photo-button(
          entity-name="ActionPicture"
          :trim="true"
          size="mini"
          @done="onImageUpload"
          :allow-multiple="false"
        )
      .align
        el-button-group
          el-button(
            v-for="b in layoutButtons"
            :key="b.name"
            :icon="b.icon"
            size="mini"
            @click="model.align = b.name"
            :type="model.align === b.name ? 'primary' : 'default'"
          )

    article-picture-select-list(
      v-loading="busyText"
      :element-loading-text="busyText"
      element-loading-spinner="el-icon-loading"
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
import map from 'lodash/map';
import find from 'lodash/find';
import filter from 'lodash/filter';
import DrawerEditor from '@/lib/DrawerEditor';
import Action from '@/models/Action';
import ArticlePicture from '@/models/ArticlePicture';
import ActionPictureForm from '@/components/actions/ActionPictureForm.vue';
import ArticlePictureSelectList from '@/components/catalogue/ArticlePictureSelectList.vue';
import TakePhotoButton from '@/components/TakePhotoButton.vue';
import ims from '@/lib/ims';

const NAME = 'ActionPicturesEdit';

export default {

  name: NAME,
  mixins: [DrawerEditor, ims],

  components: {
    TakePhotoButton,
    ActionPictureForm,
    ArticlePictureSelectList,
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
    layoutButtons() {
      return [
        {
          icon: 'el-icon-d-arrow-left',
          name: 'flex-start',
        }, {
          icon: 'el-icon-video-pause',
          name: 'center',
        },
        {
          icon: 'el-icon-d-arrow-right',
          name: 'flex-end',
        },
      ];
    },
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
        align: 'flex-end',
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
      this.$set(data, 'layout', this.model);
      this.performOperation(() => Action.create(data));
    },

    removeSelected({ articlePictureId }) {
      const idx = this.idsModel.indexOf(articlePictureId);
      if (idx === -1) {
        this.$debug('not found', articlePictureId);
        return;
      }
      this.idsModel.splice(idx, 1);
    },

    async processPictureUrl({ articlePictureId }) {

      const articlePicture = await ArticlePicture.find(articlePictureId);

      if (!articlePicture) {
        throw new Error(`Not found ArticlePicture ${articlePictureId}`);
      }

      const { pictures } = await this.imsGet('ActionPicture', articlePicture.largeSrc);
      const { src } = find(pictures, { name: 'smallImage' });
      const { src: thumbnailSrc } = find(pictures, { name: 'thumbnail' });

      return {
        src,
        thumbnailSrc,
      };

    },

    async onImageUpload(picturesInfo) {

      const { src } = find(picturesInfo, { name: 'smallImage' });
      const { src: thumbnailSrc } = find(picturesInfo, { name: 'thumbnail' });
      const id = v4();

      const picture = {
        id,
        articlePictureId: id,
        src,
        thumbnailSrc,
        height: 100,
      };

      this.model.pictures.push(picture);
      this.idsModel.push(id);

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
          height: 100,
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

.content > * + * {
  margin-top: $margin-top;
}

.action-pictures {
  display: flex;

  > .picture {
    margin: 0 $margin-top;
  }
}

.pictures {
  min-height: 152px;
}

.content {
  padding: 0 $margin-right 0;
}

.form-buttons {
  margin-top: $margin-top;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .searching {
    flex: 1;
    margin-right: $margin;
  }

  .take-photo {
    margin-right: $margin;
  }

  .search-input {
    width: 100%;
  }
}

.align {
  //display: flex;
  //justify-content: center;
}

</style>
