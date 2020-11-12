<template lang="pug">

.campaign-action

  table
    // thead
    tr.header
      // th.number №
      th.name(:colspan="nameColspan")
        .title
          span(@click="$emit('actionClick', action)") {{ action.name }}
          template(v-if="hasAuthoring")
            el-button(
              v-if="showPictures"
              @click="onEditPicturesClick()"
              icon="el-icon-picture-outline"
              size="mini" circle
            )
            el-button(
              @click="copyAction(action)"
              icon="el-icon-copy-document"
              size="mini" circle
            )
            button-edit.edit(@click="onEditClick")
      th.required(v-for="req in requirements" :class="req.cls") {{ req.title }}
      th.discount(
        v-for="discountHeader in discountHeaders" :key="discountHeader.cls"
        :class="discountHeader.cls"
      ) {{ discountHeader.title }}
    // tbody
    tr.option(v-for="(option, idx) in hasOptions")

      td.number {{ idx + 1 }}

      td.ranges(:action="action" v-if="hasRanges && !idx" :rowspan="hasOptions.length")
        .name(v-for="range in action.ranges") {{ range.name }}
      td.comments(
        v-if="complexComments"
      )
        .comment(v-if="option.commentText")
          i.el-icon-info
          span {{ option.commentText }}

      td.complex(
        :colspan="optionColSpan(option)"
        v-if="optionColSpan(option) || !hasRanges"
      )
        action-option(
          :action="option"
          :show-conditions="!!optionColSpan(option)"
          :parent="action"
          :show-ranges="!hasRanges"
        )

      template(v-if="!optionColSpan(option)")

        td.option-required(
          v-for="req in requirements"
          :class="req.cls"
          v-html="req.fn(option) || '-'"
        )

        td.discount(
          v-if="!(action.discountCash || option.discountCash) && (!discount || idx === 0)"
          v-for="discountHeader in discountHeaders"
          :rowspan="discount && hasOptions.length"
          :class="discountHeader.cls"
        ) {{ discountValue(option, discountHeader) | decimal }}

        td.discountCash(
          v-if="option.discountCash"
          colspan="3"
        ) Бонус {{ option.discountCash }} р.

    tr.tfoot(v-if="hasFooter")
      td(:colspan="footerColspan")
        .footer
          .other
            .priority(v-if="priorityName && !hidePriority")
              i.el-icon-s-flag
              span {{ priorityName }}
            .oneTime(v-if="isOneTime")
              i.el-icon-circle-check
              span Единовременная
            .repeatable(v-if="isRepeatable")
              i.el-icon-circle-check
              span Многократная
            .needPhoto(v-if="action.needPhoto")
              i.el-icon-camera-solid
              span Фото-отчет
            .territory(v-if="action.territory")
              i.el-icon-location
              span {{ action.territory }}
            .comment(v-if="action.commentText && !moveCommentToLayout")
              i.el-icon-info
              styled-comment(:text="action.commentText")
          action-pictures(
            v-if="showPictures && layoutHasPictures"
            :layout="layout"
            :parent-comment-text="action.commentText"
            :size="pictureSize"
          )

  action-history-view(:history="action.actionHistory" v-if="withHistory")
  //.restrictions(v-if="hasRestrictions")
    action-option(v-for="restriction in hasRestrictions" :action="restriction")

</template>
<script>

import find from 'lodash/find';
import get from 'lodash/get';
import { createNamespacedHelpers } from 'vuex';
import StyledComment from '@/components/StyledComment.vue';
import ActionOption from '@/components/actions/ActionOption.vue';
import ActionRequired from '@/components/actions/ActionRequired.vue';
import ActionPictures from '@/components/actions/ActionPictures.vue';
import ActionHistoryView from '@/components/actions/ActionHistoryView.vue';
import actionBase from '@/components/actions/actionBase';
import { COPY_ACTION } from '@/vuex/campaigns/actions';
import { SHOW_PICTURES } from '@/vuex/campaigns/getters';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignAction';

export default {
  name: NAME,
  props: {
    hidePriority: Boolean,
    withPictures: {
      type: Boolean,
      default: false,
    },
    withHistory: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    StyledComment,
    ActionPictures,
    ActionHistoryView,
    ActionOption,
    ActionRequired,
  },
  computed: {
    ...mapGetters({
      showPicturesGlobal: SHOW_PICTURES,
    }),
    pictureSize() {
      return this.withPictures ? 'small' : 'thumbnail';
    },
    showPictures() {
      return this.showPicturesGlobal || this.withPictures;
    },
    moveCommentToLayout() {
      const { showPictures, action: { commentText }, layoutHasPictures } = this;
      return showPictures && commentText && layoutHasPictures && !this.layout.commentText;
    },
    nameColspan() {
      return this.complexComments ? 3 : 2;
    },
    footerColspan() {
      return this.complexComments ? 8 : 7;
    },
    layoutHasPictures() {
      const { layout } = this;
      return layout && layout.pictures.length;
    },
    layout() {
      // const { layout, ts } = this.action;
      return this.$tsReactive(this.action, 'layout');
    },
    discountHeaders() {
      return this.action.discountHeaders();
    },
    hasRanges() {
      const { ranges = [] } = this.action;
      return ranges.length; // && !this.hasDetailedOptions;
    },
    complexComments() {
      return this.hasRanges && this.hasDetailedOptions;
    },
    hasDetailedOptions() {
      const { options } = this.action;
      return find(options, 'commentText');
    },
    isRepeatable() {
      return get(this.action, 'repeatable') && !get(this.action, 'campaign.repeatable');
    },
    isOneTime() {
      return get(this.action, 'oneTime') && !get(this.action, 'campaign.oneTime');
    },
    hasFooter() {
      return this.isOneTime
        || this.isRepeatable
        || this.action.commentText
        || this.action.territory
        || (!this.hidePriority && this.priorityName)
        || (this.layoutHasPictures && this.showPictures)
        || this.action.needPhoto;
    },
  },
  methods: {
    ...mapActions({
      copyAction: COPY_ACTION,
    }),
    optionColSpan(option) {
      return ((option.options && option.options.length) || option.discountMatrix) ? 6 : undefined;
    },
    onEditClick() {
      const { id: actionId } = this.action;
      this.updateRouteParams({ actionId }, {}, 'campaignActionEdit');
    },
    onEditPicturesClick() {
      const { id: actionId } = this.action;
      this.updateRouteParams({ actionId }, {}, 'campaignActionPicturesEdit');
    },
    discountValue(option, { name }) {
      if (name === 'discountTotal') {
        return this.discountValueSimple(option, 'discountOwn')
          + this.discountValueSimple(option, 'discountComp');
      }
      return this.discountValueSimple(option, name);
    },
    discountValueSimple(option, name) {
      return this.action[name] || option[name] || 0;
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
  @media print {
    border-color: $table-border-color;
    padding: $padding-print;
  }
}

table {

  width: 100%;

  td.complex {
    padding: 0;
    min-height: 0;
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

tr.header {

  background: $gray-background;

  th {
    padding: $padding * 2;
    @media print {
      padding: $padding-print;
    }

  }

}

.needPhoto {
  padding: 1px $padding;
  background: $orange;

  &, i {
    color: white !important;
  }
}

.other .comment {
  margin-top: $margin-top-small;
  @media print {
    margin-top: $margin-top-small-print;
  }
  //white-space: pre-line;
  display: block !important;
}

.tfoot td > * {
  margin-right: $margin-right;
  display: inline-block;
}

.tfoot {

  .footer {
    display: flex;
    flex-direction: column;
  }

  .action-pictures {
    justify-content: flex-end;
    margin-top: $margin-top;
  }

  .other {
    flex: 1;

    > * {
      margin-right: $margin-right;
      display: inline-block;
    }
  }

}

.tfoot td {

  padding: $padding;
  text-align: left;

  @media print {
    padding: $padding-print;
  }

  span {
    font-size: $small-font-size;
    @media print {
      font-size: $small-font-size-print;
    }
  }

  i {
    color: $orange;
    margin-right: $padding;
  }

  .priority {
    display: block;

    & + * {
      margin-top: $padding;
    }

  }

}

td.discount, th.discount {
  width: 90px;
  @media print {
    width: 60px;
  }
}

th.volume, td.volume {
  width: 110px;
  max-width: 110px;
  //@media print {
  //  width: 80px;
  //  max-width: 80px;
  //}
}

th.sku, td.sku {
  width: 60px;
  max-width: 60px;
  @media print {
    width: 40px;
    max-width: 40px;
  }
}

th.number, td.number {
  width: 40px;
  background: $gray-background;
  @media print {
    width: 26px;
  }
}

td.comments {
  text-align: left;
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
        @media print {
          font-size: $font-size-large-print;
        }
        flex: 1;

        & + .el-button {
          margin-left: $margin-right;
        }
      }

    }

  }
}

.action-history-view {
  margin-top: $padding;
}

</style>
