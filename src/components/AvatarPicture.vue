<template lang="pug">

  .avatar
    img.placeholder(v-if="imageSrc" :src="imageSrc")
    img(src="/images/placeholder.png" v-else)

</template>

<script>

export default {
  name: 'AvatarPicture',
  props: {
    imageSrc: String,
  },
};

</script>

<style scoped lang="scss">

  @import "../styles/variables";

  $avatar-size: 50px;

  .avatar {

    cursor: zoom-in;
    min-width: $avatar-size;
    min-height: $avatar-size;
    text-align: center;
    margin-right: $margin-right;

    img {
      max-width: $avatar-size;
      max-height: $avatar-size;
    }

  }

</style>
