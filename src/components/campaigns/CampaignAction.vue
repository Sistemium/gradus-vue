<template lang="pug">

.campaign-action

  table
    thead
      tr.header
        // th.number №
        th.name(colspan="2")
          .title
            span {{ action.name }}
            button-edit.edit(@click="onEditClick")
        th.required(v-for="req in requirements" :class="req.cls") {{ req.title }}
        th.discount(v-for="discountHeader in discountHeaders") {{ discountHeader.title }}
    tbody
      tr.option(v-for="(option, idx) in hasOptions")

        td.number {{ idx + 1 }}

        td.ranges(:action="action" v-if="hasRanges && !idx" :rowspan="hasOptions.length")
          .name(v-for="range in action.ranges") {{ range.name }}
        td.complex(:colspan="optionColSpan(option)" v-if="!hasRanges")
          action-option.ranges(:action="option" :show-conditions="optionColSpan(option)")

        template(v-if="!optionColSpan(option)")

          td(
            v-for="req in requirements"
            v-if="!req.fn(action) || idx === 0"
            :rowspan="req.fn(action) && hasOptions.length || undefined"
            :class="req.cls"
          ) {{ req.fn(action) || req.fn(option) }}

          td.discount(
            v-if="!discount || idx == 0"
            v-for="discountHeader in discountHeaders"
            :rowspan="discount && hasOptions.length"
          ) {{ action[discountHeader.name] || option[discountHeader.name] || '-' }}

    tfoot
      tr
        td(colspan="6")
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
    optionColSpan(option) {
      return (option.options && option.options.length) ? 5 : undefined;
    },
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

tbody {
  td.complex {
    padding: 0;
  }
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

  padding: $padding;
  text-align: left;

  span {
    font-size: smaller;
  }

  i {
    color: $orange;
    margin-right: $padding;
  }
}

td.discount, th.discount {
  width: 90px;
}

th.volume, td.volume {
  width: 90px;
  max-width: 90px;
}

th.sku, td.sku {
  width: 60px;
  max-width: 60px;
}

th.number, td.number {
  width: 40px;
}

@media print {
  .campaign-action {
    page-break-inside: avoid;
  }
}

th, td {
  box-sizing: border-box;
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
        font-weight: bold;
        font-size: 16px;
        flex: 1;
      }

    }

  }
}

</style>
