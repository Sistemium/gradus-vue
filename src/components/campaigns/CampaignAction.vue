<template lang="pug">

.campaign-action

  // .header
    .name {{ action.name }}
      .comment(v-if="action.commentText") {{ action.commentText }}
    .buttons
      button-edit.edit(@click="onEditClick")

  table
    thead
      tr.header
        // th.number №
        th.name(colspan="2")
          .title
            span {{ action.name }}
            button-edit.edit(@click="onEditClick")
        th.required условия
        // th(:colspan="discountHeaders.length") Скидка %
        th.discount(v-for="discountHeader in discountHeaders") {{ discountHeader.title }}
    tbody
      tr.option(v-for="(option, idx) in hasOptions")
        td.number {{ idx + 1 }}
        td.ranges(:action="action" v-if="hasRanges && !idx" :rowspan="hasOptions.length")
          .name(v-for="range in action.ranges") {{ range.name }}
        action-option.ranges(:action="option" v-if="!hasRanges")
        action-required(
          v-if="hasRequired && idx === 0"
          :action="action" :rowspan="hasOptions.length"
        )
        action-required(v-if="!hasRequired" :action="option" :always="true")
        template(v-if="discount && idx === 0")
          td.discount(
            v-for="discountHeader in discountHeaders"
            :rowspan="hasOptions.length"
          ) {{ action[discountHeader.name] || '-' }}
        // action-discount(
        // v-if="discount && idx === 0" :action="action" :rowspan="hasOptions.length")
        template(v-if="!discount")
          td.discount(
            v-for="discountHeader in discountHeaders"
          ) {{ option[discountHeader.name] || '-' }}
    tfoot
      tr
        td(colspan="5")
          .oneTime(v-if="action.oneTime")
            i.el-icon-circle-check
            span Единовременная
          .repeatable(v-if="action.repeatable")
            i.el-icon-circle-check
            span Многократная
          .repeatable(v-if="action.needPhoto")
            i.el-icon-camera-solid
            span Фото-отчет
          .territory
            i.el-icon-location
            span {{ action.territory || 'Вся территория покрытия' }}
          .comment(v-if="action.commentText")
            i.el-icon-info
            span {{ action.commentText }}


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
    hasRanges() {
      const { ranges = [] } = this.action;
      return ranges.length;
    },
    hasFooter() {
      return this.action.oneTime
        || this.action.repeatable
        || this.action.commentText
        || this.action.needPhoto;
    },
  },
  methods: {
    onEditClick() {
      const { id: actionId } = this.action;
      this.updateRouteParams({ actionId }, {}, 'campaignActionEdit');
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

  > .number {
    font-weight: bold;
    text-align: center;
  }

  > .action-option {
    flex: 1;
  }

}

thead {

  background: $gray-background;

  th {
    padding: $padding * 2;
  }

}

table {
  width: 100%;
}

.comment {
  margin-top: $padding;
  white-space: pre-line;
  display: block;
}

tfoot td > * {
  margin-right: $margin-right;
  display: inline-block;
}

tfoot td {
  text-align: left;

  span {
    font-size: smaller;
  }

  i {
    color: $orange;
    margin-right: $padding;
  }
}

td.discount, th.discount, th.required, td.action-required {
  width: 70px;
}

th.number, td.number {
  width: 30px;
}

@media print {
  .campaign-action {
    page-break-inside: avoid;
  }
}

th {
  font-weight: 500;
  color: $light-gray;

  &.name {
    .title {
      color: $black;
      display: flex;
      align-items: center;

      span {
        text-align: left;
        font-weight: 500;
        font-size: larger;
        flex: 1;
      }

    }

  }
}

</style>
