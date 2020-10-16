<template lang="pug">

.form-buttons
  confirm-button(
    size="small" type="warning"
    @confirm="$emit('deleteClick')"
    text="Удалить"
    v-if="!changed"
    :disabled="loading"
  )
  el-button(
    type="default" size="small"
    @click="$emit('cancelClick')"
    :disabled="loading"
  ) {{ changed ? 'Отмена' : 'Закрыть' }}
  el-button(
    type="primary" size="small"
    @click="$emit('saveClick')"
    :disabled="loading"
    v-if="changed"
  ) Сохранить

</template>
<script>

const NAME = 'FormButtons';

export default {
  props: {
    loading: Boolean,
    changed: Boolean,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.form-buttons {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

</style>
