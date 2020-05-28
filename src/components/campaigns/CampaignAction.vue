<template lang="pug">

.campaign-action

  .header
    .name {{ action.name }}
      .comment(v-if="action.commentText") ({{ action.commentText }})
    .buttons
      button-edit.edit(@click="onEditClick")

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
        action-required(
          v-if="hasRequired && idx === 0"
          :action="action" :rowspan="hasOptions.length"
        )
        action-required(v-if="!hasRequired" :action="option")
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

import ActionOption from '@/components/actions/ActionOption.vue';
import ActionRequired from '@/components/actions/ActionRequired.vue';
import actionBase from '@/components/actions/actionBase';

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
  methods: {
    onEditClick() {
      const { params } = this.$route;
      this.$router.push({
        name: 'campaignActionEdit',
        params: {
          ...params,
          actionId: this.action.id,
        },
      });
    },
  },
  mixins: [actionBase],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./../actions/actionBase";

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

  > .header {
    border: $list-cell-borders;
    border-bottom-style: none;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
  }

  > .header {
    display: flex;

    > .name {
      flex: 1;
    }

    background: $gray-background;
    padding: $padding * 2;
    font-weight: 600;
  }

}

table {
  width: 100%;
}

</style>
