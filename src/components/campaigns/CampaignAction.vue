<template lang="pug">

.campaign-action

  .name {{ action.name }}
    .comment(v-if="action.commentText") ({{ action.commentText }})

  table
    thead
      tr.headers
        th.number(rowspan="2")
        th.options(rowspan="2") Ассортимент
        th.required(rowspan="2") Условия
        th.discount(:colspan="discountHeaders.length") Скидка
      tr
        th(v-for="discountHeader in discountHeaders") {{ discountHeader.title }}
    tbody
      tr.option(v-for="(option, idx) in hasOptions")
        td.number {{ idx + 1 }}
        action-option.ranges(:action="option")
        action-required(v-if="required && idx === 0" :action="action" :rowspan="hasOptions.length")
        action-required(v-if="!required" :action="option")
        template(v-if="discount && idx === 0")
          td(
            v-for="discountHeader in discountHeaders"
            :rowspan="hasOptions.length"
          ) {{ action[discountHeader.name] }}
        // action-discount(
        // v-if="discount && idx === 0" :action="action" :rowspan="hasOptions.length")
        template(v-if="!discount")
          td(
            v-for="discountHeader in discountHeaders"
          ) {{ option[discountHeader.name] }}

  //.restrictions(v-if="hasRestrictions")
    action-option(v-for="restriction in hasRestrictions" :action="restriction")

</template>
<script>

import ActionOption from '@/components/campaigns/ActionOption.vue';
import ActionRequired from '@/components/campaigns/ActionRequired.vue';
import actionBase from '@/components/campaigns/actionBase';

const NAME = 'CampaignAction';

export default {
  name: NAME,
  components: {
    ActionOption,
    ActionRequired,
  },
  computed: {
    discountHeaders() {
      return this.action.discountHeaders();
    },
  },
  mixins: [actionBase],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./actionBase";

table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid $gray-border-color;
  text-align: center;
  padding: $padding;
}

.ranges {
  text-align: left;
}

.option {

  /*display: flex;*/
  /*align-items: center;*/

  > .number {
    min-width: 25px;
    font-weight: bold;
    color: $primary-color;
    text-align: center;
  }

  > .action-option {
    flex: 1;
  }

}

.conditions {

  display: flex;
  background: $gray-background;
  padding: 1px;

}

.action-required, .action-option, .action-discount {
  background: white;
  margin: 1px 0;
}

.campaign-action {

  margin-top: $margin-top;
  border: $list-cell-borders;

  &, > .name {
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  > .name {
    background: $gray-background;
    padding: $padding * 2;
    font-weight: 600;
  }

}

table {
  width: 100%;
}

</style>
