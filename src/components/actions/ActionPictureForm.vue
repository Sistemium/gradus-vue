<template lang="pug">

.action-picture-form(
  v-loading="!isReady"
  element-loading-text="Обработка ..."
)

  .image(
    :style="imageStyle"
  )
    img(
      v-if="isReady"
      :src="src(picture)"
      :class="size"
    )
    //i.el-icon-loading(v-else)

  el-slider.height(
    vertical
    v-model="picture.height"
    v-if="editable && isReady"
  )

  .remove(v-if="editable" @click="$emit('removeClick', picture)")
    i.el-icon-remove

  .label
    el-input(v-if="editable" v-model="picture.label" size="mini")

</template>
<script>

const NAME = 'ActionPictureForm';

export default {

  name: NAME,

  props: {
    picture: Object,
    size: {
      type: String,
      default: 'thumbnail',
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isReady() {
      return !!this.picture.src;
    },
    imageStyle() {
      const { height = 100 } = this.picture;
      return { 'max-height': `${height}%` };
    },
  },

  methods: {
    src(picture) {
      const res = picture[`${this.size}Src`];
      return res || picture.src;
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.action-picture-form {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: auto auto;
  position: relative;
}

.image {
  grid-row: 1;
  grid-column: 1;
  display: flex;
  align-self: end;
  text-align: center;

  img {

    flex: 1;
    object-fit: contain;
    max-height: 110px;

  }
}

.height {
  grid-row: 1;
  grid-column: 2;
}

.label {
  margin-top: $margin-top;
  max-width: 80px;
}

.remove {
  position: absolute;
  top: 0;
  font-size: 20px;
  color: $green;
}


</style>
