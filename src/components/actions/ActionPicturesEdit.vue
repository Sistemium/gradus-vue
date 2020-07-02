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

    resize.pictures(
      :padding="140"
    )
      el-alert(v-if="noMatchingPictures" :show-icon="true" type="warning")
        span Нет подходящих изображений
      .picture(
        v-for="picture in pictures" :key="picture.id"
        @click="pictureClick(picture)"
      )
        .thumbnail
          img(:src="picture.thumbnailSrc")
        .articles
          .name(v-for="article in picture.articles" :key="article.id") {{ article.name }}
        .status(v-if="isSelected(picture)")
          i.el-icon-check

  form-buttons(
    :loading="loading"
    :changed="changed"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
  )

</template>
<script>

import { searchArticlePictures } from '@/services/catalogue';
import DrawerEditor from '@/lib/DrawerEditor';
import FormButtons from '@/lib/FormButtons.vue';
import Action from '@/models/Action';
import ActionPictures from '@/components/actions/ActionPictures.vue';

const NAME = 'ActionPicturesEdit';

export default {
  name: NAME,
  mixins: [DrawerEditor],
  components: {
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
    noMatchingPictures() {
      return this.searchText && !this.loading && !this.pictures.length;
    },
    modelOrigin() {
      return this.actionInstance().articlePictureIds || [];
    },
  },
  methods: {
    actionInstance() {
      return this.getPlainInstanceById(Action, this.actionId);
    },
    pictureClick(picture) {
      const { id } = picture;
      if (this.isSelected(picture)) {
        this.model.splice(this.model.indexOf(picture), 1);
      } else {
        this.model.push(id);
      }
    },
    saveClick() {
      const data = this.actionInstance();
      data.articlePictureIds = this.model;
      this.performOperation(() => Action.create(data));
    },
    isSelected(picture) {
      const { id } = picture;
      const selected = this.model.indexOf(id);
      return selected > -1;
    },
    removeSelected({ id }) {
      this.model.splice(this.model.indexOf(id), 1);
    },
  },
  watch: {
    async searchText(text) {
      if (!text) {
        this.pictures = [];
        return;
      }
      this.loadingMessage = 'Поиск изображений ...';
      this.pictures = await searchArticlePictures(text);
      this.loadingMessage = '';
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

.picture {
  display: flex;
  padding: $padding 0;
  position: relative;

  img {
    max-height: 80px;
  }

  .thumbnail {
    width: 80px;
    text-align: center;
  }

  .articles {
    flex: 1;
    text-align: left;
    font-size: 11px;
  }

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
  padding: 0 $margin-right 60px;
}

</style>
