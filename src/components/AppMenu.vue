<template lang="pug">

el-menu(:default-active="$route.path" mode="horizontal" :router="true")
  el-menu-item(index="/")
    img(src="../assets/icons8-home.svg")
    span Начало
  el-menu-item(index="/catalogue")
    img(src="../assets/icons8-moleskine.svg")
    span Каталог
  el-menu-item(index="/about")
    img(src="../assets/icons8-info.svg")
    span О проекте

</template>
<script>

export default {
  name: 'AppMenu',
  data() {
    return {
      // activeIndex: '/',
    };
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

$img-size: 30px;

img {
  height: $img-size;
  width: $img-size;
  & + * {
    margin-left: $margin-right;
  }
}

</style>
