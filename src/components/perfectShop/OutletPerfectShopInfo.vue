<template lang="pug">

.outlet-perfect-shop-info

  .stats

    .header.block.name Блок
    .header.block.goal Задача ₽
    .header.block.value Факт ₽
    .header.assortment.name Ассортимент
    .header.assortment.rule Условие
    .header.assortment.goal Цель
    .header.assortment.value Факт

    template(v-for="block in blocks")

      .block.name(:style="{ 'grid-row': blockGridRow(block) }")
        span {{ block.name }}

      .block.goal(:style="{ 'grid-row': blockGridRow(block) }")
        span {{ block.goal | number }}

      .block.value(
        :style="{ 'grid-row': blockGridRow(block) }"
        :class="{ done: block.result }"
      )
        span {{ block.value | decimal(2) }}

      template(v-for="(assortment, $index) in block.assortments")

        .assortment.name(
          v-if="!$index || assortment.name !== block.assortments[$index - 1].name"
          :style="{ 'grid-row': blockGridRow(assortment) }"
        ) {{ assortment.name }}

        .assortment.rule {{ ruleName(assortment.rule) }}
        .assortment.goal {{ assortment.goal | number }}
        .assortment.value(
          :class="{ done: assortment.result }"
        ) {{ assortment.value | decimal(0) }}

</template>
<script>

import * as svc from '@/services/perfectShop';

const NAME = 'OutletPerfectShopInfo';

export default {

  name: NAME,

  props: {
    stat: Object,
  },

  computed: {
    blocks() {
      return svc.blocksFromStat(this.stat);
    },
  },

  methods: {
    // assortmentGridRow(assortment) {
    //   return assortment && block && 'auto';
    // },
    blockGridRow(block) {
      const { rowspan } = block;
      return `${'auto'} / span ${rowspan}`;
    },
    ruleName(rule) {
      return svc.ruleName(rule);
    },
  },

};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

.stats {

  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  background: $gray;
  border: solid 1px $gray;
  grid-gap: 1px;

  > * {
    background: white;
    padding: $padding;
  }
}

.name {
  text-align: left;
}

.block {

  display: flex;
  align-items: center;

  &.name {
    grid-column: 1;
  }

}

.block.goal {
  grid-column: 2;
}

.block.value {
  grid-column: 3;
}

.assortment.name {
  grid-column: 4;
  display: flex;
  align-items: center;
}

.rule {
  grid-column: 5;
  text-align: center;
}

.goal, .value {
  justify-content: flex-end;
  text-align: right;
}

.assortment.goal {
  grid-column: 6;
}

.assortment.value {
  grid-column: 7;
}

.header {
  font-weight: bold;
  text-align: center;
  justify-content: center;
}

.done {
  background: $light-green;
}

</style>
