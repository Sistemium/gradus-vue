<template lang="pug">

resize.article-picture-select-list(
  :padding="120"
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

</template>
<script>

import { searchArticlePictures } from '@/services/catalogue';

const NAME = 'ArticlePictureSelectList';

export default {

  name: NAME,

  data() {
    return {
      pictures: [],
    };
  },

  props: {
    loading: Boolean,
    value: Array,
    searchText: String,
  },

  computed: {
    noMatchingPictures() {
      return this.searchText && !this.loading && !this.pictures.length;
    },
  },

  methods: {
    isSelected(picture) {
      const { id } = picture;
      const selected = this.value.indexOf(id);
      return selected > -1;
    },
    pictureClick(picture) {
      const { id } = picture;
      const model = [...this.value];
      // this.$debug(id, this.value);
      if (this.isSelected(picture)) {
        const idx = model.indexOf(id);
        this.$debug(id, idx);
        model.splice(idx, 1);
      } else {
        model.push(id);
      }
      this.$emit('input', model);
    },
    async onSearchText(text) {
      if (!text) {
        this.pictures = [];
        return;
      }
      this.$emit('loadingMessage', 'Поиск изображений ...');
      try {
        this.pictures = await searchArticlePictures(text);
      } catch (e) {
        this.$notify.error({
          title: 'Ошибка',
          message: e.message,
        });
      }
      this.$emit('loadingMessage', '');
    },
  },

  watch: {
    searchText(text) {
      this.onSearchText(text)
        .catch(this.$error);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

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

</style>
