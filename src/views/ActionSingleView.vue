<template lang="pug">

.action-single-view(
  v-if="campaign && action"
  :class="viewClass"
)

  h1.campaign
    img(src="../assets/icons8-discount-orange.svg")
    .name Акция {{ campaign.name }}

  campaign-action(
    :action="action"
    :with-pictures="true"
    :with-history="false"
  )

  action-pictures(
    :layout="layout"
    :parent-comment-text="action.commentText"
    size="small"
  )

  .footer(v-if="campaign")
    .fields
      .oneTime(v-if="campaign.oneTime")
        i.el-icon-circle-check
        span Единовременная
      .repeatable(v-if="campaign.repeatable")
        i.el-icon-circle-check
        span Многократная
      .needPhoto(v-if="campaign.needPhoto")
        i.el-icon-camera-solid
        span Фото-отчет
      .territory(v-if="campaign.territory")
        i.el-icon-location
        span {{ campaign.territory }}
    img(src="../assets/icons8-discount-orange.svg")

</template>
<script>

import sumBy from 'lodash/sumBy';
import Action from '@/models/Action';
import Campaign from '@/models/Campaign';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';
import ActionPictures from '@/components/actions/ActionPictures.vue';

const NAME = 'ActionSingleView';

export default {

  name: NAME,
  components: {
    CampaignAction,
    ActionPictures,
  },

  props: {
    actionId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      action: null,
      campaign: null,
      logo: '../assets/icons8-discount-green.svg',
    };
  },

  computed: {
    layout() {
      const { layout = {} } = this.action || {};
      return layout;
    },
    viewClass() {
      const { action } = this;
      if (!action) {
        return 'loading';
      }
      const { options: variants, ranges: commonRanges = [] } = action;
      const length = commonRanges.length || sumBy(variants, variant => {
        const { options: addOptions = [], ranges = [] } = variant;
        if (ranges.length) {
          return ranges.length;
        }
        if (addOptions.length) {
          return addOptions.length;
        }
        return 1;
      });
      return length > 7 ? 'tall' : null;
    },
  },

  created() {
    this.$watchImmediate('actionId', actionId => {
      if (!actionId) {
        return;
      }
      this.$bindById(Action, actionId, 'action');
      Action.find(actionId);
    });

    this.$watchImmediate('action.campaignId', campaignId => {
      if (!campaignId) {
        return;
      }
      this.$bindById(Campaign, campaignId, 'campaign');
      Campaign.find(campaignId);
    });

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

//$header-color: #F44336;
//$header-color: #2ECC71;
//$header-color: rgb(0, 123, 193);
$header-color: rgb(87, 53, 128);
$header-color: lighten(rgb(0, 88, 87), 1%);

img {
  max-height: 75px;
}

@mixin header-font($tall: null) {
  font-weight: 500;
  color: $header-color;
  @if $tall == tall {
    font-size: 22px;
  } @else {
    font-size: 28px;
  }
}

.action-single-view {
  min-height: 750px;
  max-width: 1100px;
  //min-width: 890px;
  border: dashed 1px $gray-border-color;
  padding: $margin-top;
  display: flex;
  flex-direction: column;
}

h1 .name, .footer .fields {
  //border: $list-cell-borders;
  border-radius: 10px;
  @include header-font();
  background: $light-green;
  //background: lighten($header-color, 27%);
  color: $header-color;
  padding: $margin-top;
  flex: 1;
}

.campaign {

  display: flex;
  align-items: center;

  img {
    margin-right: $margin-top;
  }

}

.action-pictures {
  font-size: 18px;
  margin-top: $margin-top;
  flex: 1;
  min-height: 0;
}

.campaign-action {

  $col-width: 170px;
  $col-mid: 105px;
  $col-mid-1: $col-mid - 1;
  $col-width-1: $col-width - 1;
  $col-width-thin: 60px;

  font-size: 18px;

  /deep/ {

    .option, .volume {
      padding: $padding 14px;
    }

    table {
      //height: 100%;
    }

    th .title {
      color: $header-color;
    }

    th .title span {
      @include header-font();
    }

    .action-required em {
      font-size: 15px;
      margin-top: $margin-top;
    }

    .tfoot {
      display: none;
    }

    button {
      display: none;
    }

    td.discount, th.discount {
      width: $col-mid;
      //@media print {
      //  width: 60px;
      //}
    }

    td {
      .action-required, .discount {
        @include header-font();
      }
    }

    th.volume, td.volume {
      width: $col-width;
      max-width: $col-width;
      //@media print {
      //  width: 80px;
      //  max-width: 80px;
      //}
    }

    th.sku, td.sku {
      width: $col-width-thin;
      max-width: $col-width-thin;
      //@media print {
      //  width: 40px;
      //  max-width: 40px;
      //}
    }

    th.number, td.number {
      width: 50px;
      background: $gray-background;
      //@media print {
      //  width: 26px;
      //}
    }

    .action-option.grid {

      grid-template-columns: auto $col-width-1 $col-width-thin - 1 $col-mid-1 $col-mid-1 $col-mid-1;

      @media print {
        //grid-template-columns: auto $col-width-1 $col-width-1 $col-width-1 $col-width-1;
      }

      &.no-ranges {
        grid-template-columns: auto $col-width-1 - 1
          $col-width-thin - 1 $col-mid-1 $col-mid-1 $col-mid-1;
        //@media print {
        //  grid-template-columns: auto 88px 39px 59px 59px;
        //}
      }

    }

    .footer .other {
      display: none;
    }

  }

}

.tall {
  .campaign-action {
    font-size: 15px;

    /deep/ {
      .option, .volume {
        padding: $padding 7px;
      }
    }
  }

  .action-pictures {
    /deep/ {
      .action-picture-view img {
        max-height: 130px;
      }
    }
  }
}


.footer {

  img {
    margin-left: $margin-top;
  }

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: $margin-top;

  i {
    margin-right: $margin-right;
  }

  .fields > * {
    margin-right: $margin;
    display: inline-block;
  }

}

</style>
