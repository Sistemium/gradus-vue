<template lang="pug">

  el-select
    el-option(v-for="")

</template>

<script>

import date from 'date-fns';

export default {

  name: "Campaigns",

  computed: {

    lastYearMonths() {

      const today = new Date();

      const year = today.getFullYear();

      const month = year.getMonth() + 1

    }

  }
}
</script>

<style scoped lang="scss">

</style>
