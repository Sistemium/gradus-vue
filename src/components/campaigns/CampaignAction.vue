<template lang="pug">

.campaign-action

  .name {{ action.name }}
    .comment(v-if="action.commentText") ({{ action.commentText }})

  .conditions
    .options(v-if="hasOptions")
      .option(v-for="(option, idx) in hasOptions")
        .number {{ idx + 1 }}
        action-option(:action="option")

    action-required(:action="action" ref="required")
    action-discount(:action="action" ref="discount")

  .restrictions(v-if="hasRestrictions")
    action-option(v-for="restriction in hasRestrictions" :action="restriction")

</template>
<script>

import ActionOption from '@/components/campaigns/ActionOption.vue';
import ActionRequired from '@/components/campaigns/ActionRequired.vue';
import ActionDiscount from '@/components/campaigns/ActionDiscount.vue';
import actionBase from '@/components/campaigns/actionBase';

const NAME = 'CampaignAction';

export default {
  name: NAME,
  components: {
    ActionOption,
    ActionRequired,
    ActionDiscount,
  },
  computed: {},
  mixins: [actionBase],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./actionBase";

.option {

  display: flex;
  align-items: center;

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

</style>
